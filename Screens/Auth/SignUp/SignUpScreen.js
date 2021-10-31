import React from 'react';
import * as Analytics from 'expo-firebase-analytics';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  I18nManager,
  Alert,
} from 'react-native';
import styles from './Style';
import { Register, ErrorsStrings } from '../../../Config/Strings';
import Inputpassowrd from '../../Components/PasswordInput/Password';
import InputPhone from '../../Components/PhoneInput/Phone';
import { AuthContext } from '../../../Hooks/Context';
import { URL } from '../../../Config/Config';
import axios from 'axios';
import store from '../../../Config/Mobx';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { Entypo } from '@expo/vector-icons';
import { PrimaryColor } from '../../../Config/ColorPalette';
import Svg, { Defs, Rect, G, Path } from 'react-native-svg';
import { width } from '../../../Config/Layout';
import Web from './Web';

function SignUp({ navigation }) {
  const { Verify } = React.useContext(AuthContext);
  const [isLoading, setLoading] = React.useState(false);
  const [isError, setError] = React.useState(' ');
  const [isURL, setURL] = React.useState('');
  const [isURLShow, setURLShow] = React.useState(false);

  //
  const [data, setData] = React.useState({
    Phone: '',
    Password: '',
    RePassword: '',
    nId: '',
  });
  //
  const [isnIdheck, setnIdCheck] = React.useState('');
  //
  const [isCheck, setCheck] = React.useState('');
  const [isPhoneCheck, setPhoneCheck] = React.useState('');
  const [isAgreeCheck, setAgreeCheck] = React.useState(false);
  const [Agree] = React.useState(new Animated.Value(0));
  const AgreeColor = Agree.interpolate({
    inputRange: [0, 100],
    outputRange: ['#F8F8F9', PrimaryColor],
  });

  //prevent back on loading

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (isLoading) {
        // Prevent default behavior of leaving the screen
        e.preventDefault();
        return;
      }

      return;
    });

    return unsubscribe;
  }, [navigation, isLoading]);

  //

  const AgreeHandler = async () => {
    Animated.parallel([
      Animated.timing(Agree, {
        toValue: !isAgreeCheck === false ? 0 : 100,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();

    if (isAgreeCheck === true) {
      setAgreeCheck(false);
    } else {
      setAgreeCheck(true);
    }

    return;
  };

  const convertToArabicNumber = async (string) => {
    return string.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) {
      return d.charCodeAt(0) - 1632;
    });
  };

  const NidInput = async (val) => {
    var ID = await convertToArabicNumber(val);
    setData({
      ...data,
      nId: ID.trim(),
    });
    if (ID === '') {
      setnIdCheck('');
      return;
    }
    if (isNaN(ID) === true && ID.length < 10) {
      setnIdCheck('Error');
      return;
    }
    if (ID.length > 10 || ID.length < 10) {
      setnIdCheck('Error');
      return;
    }
    if (isNaN(ID) === false && ID.length === 10) {
      setnIdCheck('Success');
      return;
    }
    return;
  };

  const PhoneInput = async (val) => {
    var phone = await convertToArabicNumber(val);
    setData({
      ...data,
      Phone: phone.trim(),
    });
    if (phone === '') {
      setPhoneCheck('');
      return;
    }
    if (isNaN(phone) === true && phone.length < 10) {
      setPhoneCheck('Error');
      return;
    }
    if (phone.length > 10 || phone.length < 10) {
      setPhoneCheck('Error');
      return;
    }
    if (isNaN(phone) === false && phone.length === 10) {
      setPhoneCheck('Success');
      return;
    }
    return;
  };
  const PasswordInput = async (val) => {
    var pass = await convertToArabicNumber(val);
    setData({
      ...data,
      Password: pass,
    });
    if (val === '') {
      setCheck('');
    } else if (data.RePassword === pass) {
      setCheck('Success');
    } else {
      setCheck('Error');
    }
    return;
  };
  const RePasswordInput = async (val) => {
    var pass = await convertToArabicNumber(val);
    setData({
      ...data,
      RePassword: pass,
    });
    if (val === '') {
      setCheck('');
    }
    if (data.Password === pass) {
      setCheck('Success');
    } else {
      setCheck('Error');
    }
    return;
  };

  //Aa123123
  const RegisterAccount = async (val) => {
    setLoading(true);

    await Keyboard.dismiss();
    if (isLoading) {
      return;
    }
    if (
      val.Password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,24}$/) &&
      isCheck === 'Success' &&
      isPhoneCheck === 'Success' &&
      isAgreeCheck === true &&
      isnIdheck === 'Success'
    ) {
      Alert.alert(
        Register.CreateWarrning,
        I18nManager.isRTL
          ? `الجوال: ${val.Phone} \n الهوية: ${val.nId} \n لا يمكنك تعديلها لاحقًا!`
          : `Mobile: ${val.Phone} \n ID: ${val.nId} \n You connot edit them later!`,
        [
          {
            text: 'Cancel',
            onPress: () => setLoading(false),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => CreateAccount(val) },
        ]
      );
    } else {
      setLoading(false);
    }

    return;
  };

  const CreateAccount = async (val) => {
    axios
      .post(URL + '/user/signup', {
        phone: val.Phone,
        password: val.Password,
        nID: val.nId,
      })
      .then(async (response) => {
        if (response.data.error === 'exists') {
          // console.log(response.data.error)
          setError(ErrorsStrings.MobileUsed);
          setLoading(false);
          return;
        } else if (response.data.error === 'existsID') {
          // console.log(response.data.error)
          setError(ErrorsStrings.nIDUsed);
          setLoading(false);
          return;
        } else if (response.data.error === 'error') {
          setError(ErrorsStrings.ErrorOccurred);
          setLoading(false);
          return;
        } else if (response.data.check === 'success') {
          setError(' ');
          store.setDataSignup(response.data.user);
          store.setToken(response.data.token);
          await Analytics.logEvent('sign_up', {
            screen: 'SignUp',
          });

          setTimeout(() => {
            Verify();
          }, 1000);
          return;
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status) {
            if (error.response.status === 401) {
              setError(ErrorsStrings.LoginError);
              setLoading(false);
              return;
            } else {
              setError(ErrorsStrings.ErrorOccurred);
              setLoading(false);
              return;
            }
          }
        } else {
          setError(ErrorsStrings.ErrorOccurred);
          setLoading(false);
          return;
        }
      });
  };

  const openweb = async (val) => {
    setURL(val);
    setURLShow(true);
  };

  const closeweb = async () => {
    setURLShow(false);
  };

  return (
    <KeyboardAwareScrollView
      automaticallyAdjustContentInsets={false}
      resetScrollToCoords={{ x: 0, y: 0 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Svg width={width / 2} height="200" viewBox="0 0 300 300">
          <Defs />
          <Rect fill="#fff" class="a" width="300" height="300" rx="70" />
          <G transform="translate(-597.908 -352.154)">
            <Path
              fill="#AF0029"
              class="b"
              d="M851.006,472.22a17.413,17.413,0,0,0-20.842-26.9,99.834,99.834,0,0,0-182,52.312c-.067,1.465-.1,2.931-.1,4.411,0,1.443.03,2.886.1,4.313v17.44H632.547a14.421,14.421,0,0,0-14.4,14.4v7.476h39.941a99.914,99.914,0,0,0,179.721,0h21.925V488.225A19.042,19.042,0,0,0,851.006,472.22Zm-20.587-17.985a8.869,8.869,0,0,1,.665-.643,4.038,4.038,0,0,1,.4-.329,1.729,1.729,0,0,1,.239-.187c.194-.15.4-.291.613-.426.157-.1.313-.194.478-.284a.391.391,0,0,1,.119-.067,5.553,5.553,0,0,1,.516-.262c.082-.045.172-.082.262-.12.172-.074.344-.149.524-.209a9.851,9.851,0,0,1,3.431-.613,9.943,9.943,0,0,1,5.509,18.225,7.985,7.985,0,0,1-.688.418,8.473,8.473,0,0,1-.987.478c-.09.038-.179.075-.277.112a3.9,3.9,0,0,1-.448.158c-.187.067-.381.119-.576.172s-.4.1-.613.142c-.18.038-.359.068-.546.09a1.648,1.648,0,0,1-.209.03c-.12.015-.239.022-.366.03a6.966,6.966,0,0,1-.8.038,9.956,9.956,0,0,1-9.942-9.95c0-.172.007-.344.015-.509s.022-.343.037-.508a2.741,2.741,0,0,1,.045-.351,1.814,1.814,0,0,1,.03-.21,9.457,9.457,0,0,1,.478-1.839c.045-.127.09-.247.142-.366a7.875,7.875,0,0,1,.456-.949c.067-.135.142-.262.217-.389.1-.165.2-.322.306-.471a3.211,3.211,0,0,1,.246-.337,14.607,14.607,0,0,1,.725-.874Zm-86.788,9.09a9.6,9.6,0,0,1-.27-2.287,9.974,9.974,0,1,1,.27,2.287Zm27.965-2.287a9.956,9.956,0,1,1,4.2,8.118A9.95,9.95,0,0,1,771.6,461.037Zm28.235,0a9.955,9.955,0,1,1,4.2,8.118A9.949,9.949,0,0,1,799.83,461.037Zm-67.42,86.011c.082.1.172.21.246.322a9.453,9.453,0,0,1,1.226,2.153,4.342,4.342,0,0,1,.194.509,9.044,9.044,0,0,1,.314,1.1c.038.134.06.269.09.411.007.037.014.082.022.126q.044.258.067.516c.014.1.022.217.03.322a1.99,1.99,0,0,1,.022.3c.008.172.015.344.015.516a9.946,9.946,0,0,1-19.892,0c0-.172.007-.344.015-.516s.022-.336.038-.5a2.582,2.582,0,0,1,.045-.351c.007-.09.022-.18.037-.269.008-.052.015-.1.022-.142.03-.142.053-.277.09-.411.059-.277.134-.553.217-.822.045-.135.09-.277.142-.412s.112-.3.18-.448a9.362,9.362,0,0,1,1.2-2.079c.074-.112.165-.217.246-.322a10.32,10.32,0,0,1,1.361-1.375,9.937,9.937,0,0,1,1.623-1.1c.112-.067.231-.127.343-.18a8.89,8.89,0,0,1,.98-.418,4.778,4.778,0,0,1,.463-.157,9.773,9.773,0,0,1,1.936-.4c.165-.015.337-.03.509-.038s.336-.015.508-.015.344.007.509.015.344.022.508.038a9.772,9.772,0,0,1,1.936.4,4.784,4.784,0,0,1,.463.157,8.706,8.706,0,0,1,.972.418,3.066,3.066,0,0,1,.344.18,9.641,9.641,0,0,1,1.623,1.1A10.323,10.323,0,0,1,732.41,547.048Zm-29.266-1.091c.119.1.231.217.343.329s.225.225.33.344.209.239.313.366c.172.2.337.418.494.643a9.843,9.843,0,0,1,.994,1.809c.067.149.127.3.18.448s.1.277.142.412c.082.269.157.545.217.822.038.134.06.269.09.411.008.045.015.09.022.142.015.09.03.179.038.269a2.621,2.621,0,0,1,.045.351c.015.165.03.337.038.5s.015.344.015.516a9.946,9.946,0,0,1-19.892,0c0-.172.007-.344.015-.516a1.982,1.982,0,0,1,.022-.3c.007-.1.014-.217.03-.322q.023-.258.067-.516c.007-.045.015-.09.022-.126.03-.142.053-.277.09-.411a9.169,9.169,0,0,1,.314-1.1,4.1,4.1,0,0,1,.194-.509,9.4,9.4,0,0,1,1.226-2.153c.074-.112.164-.217.246-.322a10.276,10.276,0,0,1,1.361-1.375,9.6,9.6,0,0,1,1.622-1.1,3.2,3.2,0,0,1,.344-.18,10.006,10.006,0,0,1,2.691-.874c.112-.022.224-.038.336-.052a2.511,2.511,0,0,1,.352-.045c.164-.015.336-.03.5-.038s.344-.015.516-.015.344.007.508.015.344.022.509.038a9.667,9.667,0,0,1,1.936.4,4.773,4.773,0,0,1,.463.157,8.824,8.824,0,0,1,.979.418,3.842,3.842,0,0,1,.344.18,4.246,4.246,0,0,1,.449.262,3.382,3.382,0,0,1,.351.224,9.456,9.456,0,0,1,.823.613C702.935,545.762,703.039,545.859,703.144,545.957Zm149.11-7.76H625.617a6.93,6.93,0,0,1,6.93-6.93h23.091V488.225a11.59,11.59,0,0,1,11.594-11.594h27.031a11.591,11.591,0,0,1,11.594,11.6v43.035h7.67v-63.42a11.6,11.6,0,0,1,11.594-11.595h14.816l-2.713,3.013a10.322,10.322,0,0,0-1.338,1.876v.007a10.065,10.065,0,0,0-1.248,4.859v65.268h8.686v-44.89a10.076,10.076,0,0,0-2.587-6.742l-2.713-3.012h14.824a11.585,11.585,0,0,1,11.594,11.594v43.051H772.6v-44.89a10.08,10.08,0,0,0-2.587-6.742l-2.714-3.012h14.816a11.61,11.61,0,0,1,11.6,11.594v43.051h8.156v-44.89a10.076,10.076,0,0,0-2.587-6.742l-2.713-3.012h14.816a11.388,11.388,0,0,1,4.261.814,11.579,11.579,0,0,1,7.341,10.78v43.051h8.156v-44.89a10.08,10.08,0,0,0-2.587-6.742l-2.714-3.012H840.66c.254,0,.509.007.763.03a3.927,3.927,0,0,1,.418.03c.2.022.389.045.583.075.165.022.322.052.478.082.113.022.225.045.329.074a8.406,8.406,0,0,1,.874.232.418.418,0,0,1,.09.03c.15.045.3.1.449.15.038.015.074.022.1.038a11.6,11.6,0,0,1,7.505,10.854Z"
            />
            <Path
              fill="#AF0029"
              class="b"
              d="M691.417,509.685v41.085h7.992v-51.2A10.413,10.413,0,0,0,691.417,509.685Z"
              transform="translate(-14.669 -19.502)"
            />
          </G>
        </Svg>
        <Text style={styles.Slogan}>{Register.ResetSlogan}</Text>

        <Text style={styles.error}>{isError}</Text>

        <InputPhone
          placeholder={Register.Phone}
          style={styles.input}
          onChangeText={(text) => PhoneInput(text)}
          keyboardType={'number-pad'}
          CheckPhone={isPhoneCheck}
          editable={!isLoading}
        />

        <InputPhone
          placeholder={Register.nID}
          style={styles.input}
          onChangeText={(text) => NidInput(text)}
          keyboardType={'number-pad'}
          CheckPhone={isnIdheck}
          editable={!isLoading}
        />

        <Inputpassowrd
          placeholderpassword={Register.Password}
          passwordstyle={styles.PasswordInput}
          change={(text) => PasswordInput(text)}
          placeholder={Register.RePassword}
          style={styles.PasswordInput}
          onChangeText={(text) => RePasswordInput(text)}
          MatchString={Register.Match}
          Check={isCheck}
          PasswordValue={data.Password}
          // editable={!isLoading}
        />

        <View style={styles.Terms}>
          <View>
            <TouchableOpacity
              onPress={() => (isLoading ? null : AgreeHandler())}
            >
              <Animated.View
                style={[styles.checkIconView, { backgroundColor: AgreeColor }]}
              >
                <Entypo name="check" size={14} color="#F8F8F9" />
              </Animated.View>
            </TouchableOpacity>
          </View>
          <View style={styles.warview}>
            <Text>{Register.Iagreeto}</Text>
            <TouchableOpacity
              onPress={() =>
                openweb(
                  I18nManager.isRTL
                    ? 'https://organize.wiseman.app/termsofservicear'
                    : 'https://organize.wiseman.app/termsofserviceen'
                )
              }
            >
              <Animated.Text style={styles.removeUnderline}>
                {' ' + Register.Terms}
              </Animated.Text>
            </TouchableOpacity>
            <Text style={styles.and}> & </Text>
            <TouchableOpacity
              onPress={() =>
                openweb(
                  I18nManager.isRTL
                    ? 'https://organize.wiseman.app/privacypolicyar'
                    : 'https://organize.wiseman.app/privacypolicyen'
                )
              }
            >
              <Animated.Text style={styles.removeUnderline}>
                {Register.Privacy}
              </Animated.Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.Button}
          onPress={() => RegisterAccount(data)}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.ButtonText}>{Register.Continue}</Text>
          )}
        </TouchableOpacity>

        <View style={styles.Register}>
          <Text style={styles.Member}>{Register.HaveAccount}</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.RegisterText}>{Register.Log}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Web OpenModal={isURLShow} URL={isURL} close={() => closeweb()} />
    </KeyboardAwareScrollView>
  );
}

export default SignUp;
