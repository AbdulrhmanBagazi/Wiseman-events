import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Platform,
  ActivityIndicator,
  Keyboard,
  I18nManager,
  StyleSheet,
  Alert,
} from 'react-native';
import styles from './Style';
import { ProfileStrings, ErrorsStrings } from '../../../../../Config/Strings';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AuthContext } from '../../../../../Hooks/Context';
import { inject, observer } from 'mobx-react';
import debounce from 'lodash/debounce';
import axios from 'axios';
import { URL } from '../../../../../Config/Config';
import CountryUI from './Country';
// import CitiesModal from './CitiesModal';
import { Feather } from '@expo/vector-icons';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
// import MapUI from './map';
import { width } from '../../../../../Config/Layout'; //height
import RNPickerSelect from 'react-native-picker-select';
import { PrimaryColor } from '../../../../../Config/ColorPalette';
import { UserTokenRemove } from '../../../../../Config/AsyncStorage';

// const ASPECT_RATIO = width / height;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: width + 20,
    borderBottomColor: '#DFE0E3',
    borderBottomWidth: 0.5,
    padding: 15,
    alignSelf: 'center',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    color: '#000',
    backgroundColor: '#fff',
  },
  viewContainer: {
    width: width + 20,
    borderBottomColor: '#DFE0E3',
    borderBottomWidth: 0.5,
    // padding: 15,
    alignSelf: 'center',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    justifyContent: 'center',
    color: '#000',
    backgroundColor: '#fff',
  },
  inputAndroid: {
    color: '#000',
  },
});

const Stat = I18nManager.isRTL
  ? [
      { label: 'مبتدئ', value: 'Beginner' },
      { label: 'متوسط', value: 'Intermediate' },
      { label: 'فصيح', value: 'Fluent' },
    ]
  : [
      { label: 'Beginner', value: 'Beginner' },
      { label: 'Intermediate', value: 'Intermediate' },
      { label: 'Fluent', value: 'Fluent' },
    ];

const GenderPicker = I18nManager.isRTL
  ? [
      { label: 'ذكر', value: 'male' },
      { label: 'أنثى', value: 'female' },
    ]
  : [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
    ];

//beginner, intermediate,  fluent

function UpdateProfile({ store, navigation }) {
  const { signOut } = React.useContext(AuthContext);
  const [countryCode, setCountryCode] = React.useState(
    store.data.profile.nationality
  );
  const [show, setShow] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  // const [isError, setError] = React.useState('');
  // const [isShowMap, setShowMap] = React.useState(false);
  //values
  const [Gender, setGender] = React.useState(store.data.profile.gender);
  const [date, setDate] = React.useState(true);
  const [DateValue, setDateValue] = React.useState(
    new Date(store.data.profile.birthdate)
  );
  const [data, setData] = React.useState({
    first_name: store.data.profile.first_name,
    last_name: store.data.profile.last_name,
    Nationality: store.data.profile.nationality,
    // City: store.data.profile.city,
    // Location: store.data.profile.location,
    Birth: store.data.profile.birthdate,
    BirthText: store.data.profile.birthdate,
    English: store.data.profile.english,
    // height: store.data.profile.height,
    // Latitude: '',
    // Longitude: '',
  });
  // const [CityDataEn, setCityDataEn] = React.useState(store.data.profile.city);
  //Map
  // const [isSelectMapValue, setSelectMapValue] = React.useState(true);
  // const [region, setregion] = React.useState({
  //   latitude: 24.774265,
  //   longitude: 46.738586,
  //   latitudeDelta: 0.0922,
  //   longitudeDelta: 0.0922 * ASPECT_RATIO,
  // });
  // const [Cord, setCord] = React.useState(null);

  // const onDragMapPress = async (e) => {
  //   setCord({
  //     latitude: e.nativeEvent.coordinate.latitude,
  //     longitude: e.nativeEvent.coordinate.longitude,
  //   });
  //   setData({
  //     ...data,
  //     Latitude: e.nativeEvent.coordinate.latitude,
  //     Longitude: e.nativeEvent.coordinate.longitude,
  //   });
  // };
  // const DoneButton = () => {
  //   setSelectMapValue(true);
  //   setShowMap(false);
  //   return;
  // };

  const convertToArabicNumber = async (string) => {
    return string.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) {
      return d.charCodeAt(0) - 1632;
    });
  };

  const HandleCreateProfile = async () => {
    await Keyboard.dismiss();
    // setError('');
    // var convHight = await convertToArabicNumber(data.height);

    var Age = await convertToArabicNumber(data.Birth);

    if (isLoading) {
      return;
    }
    if (
      data.first_name.length < 1 ||
      data.last_name.length < 1 ||
      data.Nationality.length < 1 ||
      // data.City.length < 1 ||
      data.Birth.length < 1 ||
      Gender.length < 1 ||
      data.English.length < 1
      // data.height.length < 1 ||
      // isSelectMapValue === false
    ) {
      Alert.alert(
        '',
        ErrorsStrings.Required,
        [{ text: 'OK', onPress: () => setLoading(false) }],
        {
          cancelable: false,
        }
      );
      return;
    }

    setLoading(true);
    axios
      .post(
        URL + '/user/updateprofile',
        {
          first_name: data.first_name,
          last_name: data.last_name,
          nationality: data.Nationality,
          birthdate: Age,
          gender: Gender,
          // city: CityDataEn,
          // location: data.Latitude + ',' + data.Longitude,
          english: data.English,
          // height: convHight,
        },
        {
          headers: { Authorization: store.token },
        }
      )
      .then(async (response) => {
        if (response.data === 'success') {
          var profile = {
            first_name: data.first_name,
            last_name: data.last_name,
            nationality: data.Nationality,
            birthdate: data.Birth,
            gender: Gender,
            // city: CityDataEn,
            // location: data.Latitude + ',' + data.Longitude,
            english: data.English,
            // height: convHight,
          };

          await store.setProfile(store.data, profile);
          Alert.alert(
            '',
            I18nManager.isRTL
              ? 'تم تحديث ملفك الشخصي'
              : 'Your profile has been updated',
            [{ text: 'OK', onPress: () => setLoading(false) }],
            {
              cancelable: false,
            }
          );
          return;
        } else {
          Alert.alert(
            '',
            I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
            [{ text: 'OK', onPress: () => setLoading(false) }],
            {
              cancelable: false,
            }
          );

          return;
        }
      })
      .catch(async (error) => {
        if (error.response) {
          if (error.response.status) {
            if (error.response.status === 401) {
              await UserTokenRemove();
              Alert.alert(
                '',
                I18nManager.isRTL
                  ? 'انتهت الجلسة ، يرجى إعادة تسجيل الدخول'
                  : 'the session ended, please re-login',
                [{ text: 'OK', onPress: () => signOut() }],
                {
                  cancelable: false,
                }
              );

              return;
            } else {
              Alert.alert(
                '',
                I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
                [{ text: 'OK', onPress: () => setLoading(false) }],
                {
                  cancelable: false,
                }
              );
              return;
            }
          }
        } else {
          Alert.alert(
            '',
            I18nManager.isRTL ? 'حدث خطأ!' : 'An error occurred!',
            [{ text: 'OK', onPress: () => setLoading(false) }],
            {
              cancelable: false,
            }
          );
          return;
        }
      });
  };

  const onChange = async (event, selectedDate) => {
    if (Platform.OS === 'ios') {
      const currentDate = selectedDate || date;
      var MomentDate = await moment(currentDate).format('YYYY-MM-DD');
      setShow(Platform.OS === 'ios');
      setDate(true);
      setDateValue(currentDate);
      setData({
        ...data,
        Birth: MomentDate.toString(),
        BirthText: MomentDate.toString(),
      });
    } else {
      if (event.type === 'dismissed') {
        setShow(false);
        setShowModal(false);
      } else if (event.type === 'set') {
        const currentDate = selectedDate || date;
        var MomentDate = await moment(currentDate).format('YYYY-MM-DD');

        setShow(false);
        setShowModal(false);
        setShow(Platform.OS === 'ios');
        setDate(true);
        setDateValue(currentDate);
        setData({
          ...data,
          Birth: MomentDate.toString(),
          BirthText: MomentDate.toString(),
        });
      }
    }

    return;
  };

  const showDatepickerIOS = () => {
    if (Platform.OS === 'ios') {
      setShow(true);
      setShowModal(true);
    } else {
      setShow(true);
      setShowModal(false);
    }
  };

  const ClosePicker = async () => {
    const currentDate = DateValue;
    var MomentDate = await moment(currentDate).format('YYYY-MM-DD');
    setShow(false);
    setShowModal(false);
    setDate(true);
    setDateValue(currentDate);
    setData({
      ...data,
      Birth: MomentDate.toString(),
      BirthText: MomentDate.toString(),
    });
  };

  //Country
  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setData({
      ...data,
      Nationality: country.cca2,
    });
  };
  //City
  // const onSelectCity = async (city) => {
  //   if (I18nManager.isRTL) {
  //     setData({
  //       ...data,
  //       City: city.name_ar,
  //     });
  //     setCityDataEn(city.name_en);
  //   } else {
  //     setData({
  //       ...data,
  //       City: city.name_en,
  //     });
  //     setCityDataEn(city.name_en);
  //   }
  // };

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

  // React.useEffect(() => {
  //   var getlocation = store.data.profile.location;

  //   var Loc = getlocation.split(',');

  //   setCord({
  //     latitude: Number(Loc[0]),
  //     longitude: Number(Loc[1]),
  //   });

  //   setregion({
  //     ...region,
  //     latitude: Number(Loc[0]),
  //     longitude: Number(Loc[1]),
  //   });
  //   setData({
  //     ...data,
  //     Latitude: Loc[0],
  //     Longitude: Loc[1],
  //   });
  // }, []);

  return (
    <KeyboardAwareScrollView
      automaticallyAdjustContentInsets={false}
      resetScrollToCoords={{ x: 0, y: 0 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={ProfileStrings.First}
          onChangeText={(text) =>
            setData({
              ...data,
              first_name: text.trim(),
            })
          }
          value={data.first_name}
          // editable={false}
        />

        <TextInput
          style={styles.input}
          placeholder={ProfileStrings.Last}
          onChangeText={(text) =>
            setData({
              ...data,
              last_name: text.trim(),
            })
          }
          value={data.last_name}
          // editable={false}
        />

        <CountryUI
          style={styles.country}
          onSelect={(val) => onSelect(val)}
          countryCode={countryCode}
        />

        <TouchableOpacity style={styles.inputDate} onPress={showDatepickerIOS}>
          {date ? (
            <Text>{data.BirthText}</Text>
          ) : (
            <Text style={styles.inputDateText}>{ProfileStrings.Birth}</Text>
          )}
          <Feather name="calendar" size={24} color="#4C4F56" />
        </TouchableOpacity>

        {!showModal && show === true ? (
          <DateTimePicker
            style={styles.picker}
            testID="dateTimePicker"
            value={DateValue}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        ) : show === true ? (
          <Modal animationType="fade" transparent={true} visible={show}>
            <View style={styles.modal}>
              <View style={styles.modalContainer}>
                <DateTimePicker
                  style={styles.picker}
                  testID="dateTimePicker"
                  value={DateValue}
                  mode="date"
                  is24Hour={true}
                  display="spinner"
                  onChange={onChange}
                />

                <TouchableOpacity
                  style={styles.ModalButton}
                  onPress={() => ClosePicker()}
                >
                  <Text style={styles.ButtonText}>{ProfileStrings.Done}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        ) : null}

        <RNPickerSelect
          onValueChange={(text) => setGender(text)}
          style={{
            ...pickerSelectStyles,
          }}
          placeholder={{
            label: Gender,
            value: '',
          }}
          items={GenderPicker}
          Icon={() => null}
          value={Gender}
        />

        {/* <CitiesModal
          CityValue={data.City}
          ViewCity={({ item }) => (
            <TouchableOpacity
              style={styles.citiesFlatlistItems}
              Value={item}
              onPress={() => onSelectCity(item)}
            >
              <Text style={{ fontSize: 16 }}>
                {I18nManager.isRTL ? item.name_ar : item.name_en}
              </Text>
            </TouchableOpacity>
          )}
        /> */}

        {/* <TouchableOpacity
          style={styles.inputDate}
          onPress={() => setShowMap(true)}
        >
          <Text>
            {isSelectMapValue
              ? ProfileStrings.locationup
              : ProfileStrings.location}
          </Text>
          <Feather
            name="map"
            size={24}
            color={isSelectMapValue ? PrimaryColor : '#000'}
          />
        </TouchableOpacity> */}
        {/*
        <TextInput
          style={styles.inputH}
          placeholder={ProfileStrings.height}
          onChangeText={(text) =>
            setData({
              ...data,
              height: text.trim(),
            })
          }
          keyboardType={'number-pad'}
          value={data.height}
        /> */}

        <RNPickerSelect
          onValueChange={(text) =>
            setData({
              ...data,
              English: text,
            })
          }
          style={{
            ...pickerSelectStyles,
          }}
          placeholder={{
            label: I18nManager.isRTL
              ? 'حدد مستواك في اللغة الإنجليزية'
              : 'Select your english level',
            value: '',
          }}
          items={Stat}
          Icon={() => null}
          value={data.English}
        />

        <TouchableOpacity
          style={styles.Button}
          onPress={debounce(() => HandleCreateProfile(), 250)}
        >
          <Text style={styles.ButtonText}>{ProfileStrings.Update}</Text>
        </TouchableOpacity>
      </View>

      {/* <MapUI
        onRegionChange={(e) => onDragMapPress(e)}
        region={region}
        coordinate={Cord}
        MapmodalVisible={isShowMap}
        Close={() => setShowMap(false)}
        DoneButton={() => DoneButton()}
      /> */}

      {/* <View style={{ height: 25 }} /> */}

      <Modal animationType="fade" transparent={true} visible={isLoading}>
        <View style={styles.modal}>
          <ActivityIndicator size="large" color={PrimaryColor} />
        </View>
      </Modal>
    </KeyboardAwareScrollView>
  );
}

export default inject('store')(observer(UpdateProfile));
