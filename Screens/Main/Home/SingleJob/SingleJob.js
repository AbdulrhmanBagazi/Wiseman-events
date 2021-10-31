import React from 'react';
import {
  View,
  Text,
  I18nManager,
  TouchableOpacity,
  ScrollView,
  Animated,
  ActivityIndicator,
  Linking,
  Platform,
} from 'react-native';
import { inject, observer } from 'mobx-react';
import styles from './Style';
import SingleJobImage from './SingleJobImage';
import Icon from '../../../../Config/Icons';
import { SingleJobStrings, ErrorsStrings } from '../../../../Config/Strings';
import Description from './Description';
import Rules from './Rules';
import Tranining from './Tranining';
import { PrimaryColor } from '../../../../Config/ColorPalette';
import { width } from '../../../../Config/Layout';
import moment from 'moment';

function SingleJob({ route, store, navigation }) {
  const [isSelected, setSelected] = React.useState(0);
  const [isPoints, setPoints] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [isShifts, setShifts] = React.useState([]);

  const Scroll = React.useRef(null);
  const { items } = route.params;

  React.useEffect(() => {
    var Dpoints = I18nManager.isRTL
      ? items.DescriptionPointsAr
      : items.DescriptionPoints;
    var Rpoints = I18nManager.isRTL ? items.RulesPointsAr : items.RulesPoints;
    var Tpoints = I18nManager.isRTL
      ? items.TrainingPointsAr
      : items.TrainingPoints;
    var D = Dpoints.split(',');
    var R = Rpoints.split(',');
    var T = Tpoints.split(',');

    setPoints({ D: D, R: R, T: T });
    if (I18nManager.isRTL && Platform.OS !== 'ios') {
      var data = items.eventshifts.reverse();
      setShifts(data);
    } else {
      setShifts(items.eventshifts);
    }
    setLoading(false);
    return;
  }, []);

  const check = async (event) => {
    const xOffset = event.nativeEvent.contentOffset.x + 10;
    const currentPage = await Math.floor(xOffset / width);

    if (currentPage === -1) {
      return;
    }
    if (currentPage !== isSelected) {
      // console.log(currentPage)
      setSelected(currentPage);
      return;
    }

    return;
  };

  const ScrollTo = async (val) => {
    const currentPage = await Math.floor(val * width);
    const xOffset = currentPage + 10;
    const currentPagetwo = await Math.floor(xOffset / width);

    if (currentPagetwo === -1) {
      return;
    }
    if (currentPagetwo !== isSelected) {
      // console.log(currentPagetwo)
      Scroll.current.scrollTo({ x: currentPage });
      return;
    }

    return;
  };

  function getSalary(val) {
    if (val.jobs.length > 1) {
      var first = val.jobs[0].hourly_rate ? val.jobs[0].hourly_rate : '';
      var last = val.jobs[val.jobs.length - 1].hourly_rate
        ? val.jobs[val.jobs.length - 1].hourly_rate
        : null;
      return (
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <Text style={styles.SalarySpace}>
            {Number(last)}
            <Text style={styles.SingleSalaryTextData}>
              {I18nManager.isRTL ? 'ريال' : 'SAR'}
              <Text style={styles.Hour}>
                /{I18nManager.isRTL ? 'الساعة' : 'Hour'}
              </Text>
            </Text>
            {Number(first) ? ' -' : null} {Number(first)}
            <Text style={styles.SingleSalaryTextData}>
              {I18nManager.isRTL ? 'ريال' : 'SAR'}
              <Text style={styles.Hour}>
                /{I18nManager.isRTL ? 'الساعة' : 'Hour'}
              </Text>
            </Text>
          </Text>
        </View>
      );
    } else if (val.jobs.length === 1) {
      var first = val.jobs[0].hourly_rate ? val.jobs[0].hourly_rate : '';

      return (
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <Text style={styles.SalarySpace}>
            {Number(first)}
            <Text style={styles.SingleSalaryTextData}>
              {I18nManager.isRTL ? 'ريال' : 'SAR'}
              <Text style={styles.Hour}>
                /{I18nManager.isRTL ? 'الساعة' : 'Hour'}
              </Text>
            </Text>
          </Text>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <Text style={{ flex: 1, alignItems: 'flex-start' }}>
            {ErrorsStrings.noInfo}
          </Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.Container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.TitleImage}>
          <SingleJobImage
            source={{
              uri: items.ImageURL,
            }}
            Name={I18nManager.isRTL ? items.NameAr : items.Name}
            onPressWork={() =>
              navigation.navigate('WorkSchedule', { eventId: items.id })
            }
          />
        </View>
        <View style={styles.DataContainer}>
          <Text style={styles.SingleJobDetailsTime}>
            {SingleJobStrings.date}
            <Text style={{ color: '#000' }}>
              {items.Start && items.End ? (
                <Text style={styles.BlackColor}>
                  {I18nManager.isRTL
                    ? moment(items.Start).format('Do MMM') +
                      ' - ' +
                      moment(items.End).format('Do MMM')
                    : moment(items.Start).locale('en').format('Do MMM') +
                      ' - ' +
                      moment(items.End).locale('en').format('Do MMM')}
                </Text>
              ) : (
                <Text style={styles.BlackColor}>{ErrorsStrings.noInfo}</Text>
              )}
            </Text>
          </Text>
          <Text style={styles.SingleJobDetailsTitle}>
            {I18nManager.isRTL ? items.TitleAr : items.Title}
          </Text>
          <TouchableOpacity
            style={styles.SingleJobDetailsLocationView}
            onPress={() => Linking.openURL(items.LocationURL)}
          >
            <Icon name="map-pin" size={14} color="#000" />
            <Text style={styles.SingleJobDetailsLocation} numberOfLines={1}>
              {I18nManager.isRTL ? items.LocationAr : items.Location}
            </Text>
            <Icon name="external-link" size={14} color={PrimaryColor} />
          </TouchableOpacity>
          <View style={styles.SingleJobDetailsDataView}>
            <Text style={styles.SingleSalaryText}>
              {SingleJobStrings.Salary}
            </Text>
            <View style={styles.DataSectionsTop}>{getSalary(items)}</View>
            <View style={styles.DataSections}>
              <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <Text style={styles.SingleShiftText}>
                  {SingleJobStrings.Shifts + ': ' + items.eventshifts.length}
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <Text style={styles.SingleShiftTextSpace}>
                  {SingleJobStrings.Meal + ': '}
                  {items.ProvideAmeal === true
                    ? I18nManager.isRTL
                      ? 'نعم'
                      : 'yes'
                    : I18nManager.isRTL
                    ? 'لا'
                    : 'no'}
                </Text>
              </View>
            </View>
          </View>

          {!items.ProvideAmeal ? (
            <View style={styles.NoteView}>
              <View style={styles.NoteViewContainer}>
                <Text style={styles.NoteText}>
                  {SingleJobStrings.Note + ' '}
                </Text>
                <Text style={styles.NoteTextValue}>
                  {SingleJobStrings.Mealallowance}
                </Text>
                <Text style={styles.NoteText}>
                  {' ' + items.ProvideAnAllowance}
                  {I18nManager.isRTL ? 'ريال' : 'SAR'}
                </Text>
              </View>
            </View>
          ) : null}

          {isLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: 177,
              }}
            >
              <ActivityIndicator size="small" color={PrimaryColor} />
            </View>
          ) : (
            <View style={styles.Desctiption}>
              {I18nManager.isRTL && Platform.OS !== 'ios' ? (
                <View style={styles.SelectView}>
                  <TouchableOpacity
                    style={styles.SelectButtonFirst}
                    onPress={() => ScrollTo(0)}
                  >
                    <Animated.Text
                      style={[
                        styles.SelectText,
                        items.Training === '' && items.TrainingAr === ''
                          ? { color: isSelected === 1 ? PrimaryColor : '#000' }
                          : { color: isSelected === 2 ? PrimaryColor : '#000' },
                      ]}
                    >
                      {/** 2 */}
                      {SingleJobStrings.Description}
                    </Animated.Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.SelectButtonFirst}
                    onPress={() => ScrollTo(1)}
                  >
                    {/** 1 */}

                    <Animated.Text
                      style={[
                        styles.SelectText,
                        items.Training === '' && items.TrainingAr === ''
                          ? { color: isSelected === 0 ? PrimaryColor : '#000' }
                          : { color: isSelected === 1 ? PrimaryColor : '#000' },
                      ]}
                    >
                      {SingleJobStrings.Rules}
                    </Animated.Text>
                  </TouchableOpacity>

                  {items.Training === '' && items.TrainingAr === '' ? null : (
                    <TouchableOpacity
                      style={styles.SelectButtonFirst}
                      onPress={() => ScrollTo(2)}
                    >
                      <Animated.Text
                        style={[
                          styles.SelectText,
                          { color: isSelected === 0 ? PrimaryColor : '#000' },
                        ]}
                      >
                        {SingleJobStrings.Tranining}
                      </Animated.Text>
                    </TouchableOpacity>
                  )}
                </View>
              ) : (
                <View style={styles.SelectView}>
                  <TouchableOpacity
                    style={styles.SelectButtonFirst}
                    onPress={() => ScrollTo(0)}
                  >
                    <Animated.Text
                      style={[
                        styles.SelectText,
                        { color: isSelected === 0 ? PrimaryColor : '#000' },
                      ]}
                    >
                      {SingleJobStrings.Description}
                    </Animated.Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.SelectButtonFirst}
                    onPress={() => ScrollTo(1)}
                  >
                    <Animated.Text
                      style={[
                        styles.SelectText,
                        { color: isSelected === 1 ? PrimaryColor : '#000' },
                      ]}
                    >
                      {SingleJobStrings.Rules}
                    </Animated.Text>
                  </TouchableOpacity>

                  {items.Training === '' && items.TrainingAr === '' ? null : (
                    <TouchableOpacity
                      style={styles.SelectButtonFirst}
                      onPress={() => ScrollTo(2)}
                    >
                      <Animated.Text
                        style={[
                          styles.SelectText,
                          { color: isSelected === 2 ? PrimaryColor : '#000' },
                        ]}
                      >
                        {SingleJobStrings.Tranining}
                      </Animated.Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              <ScrollView
                pagingEnabled={true}
                scrollEventThrottle={16}
                horizontal={true}
                onScroll={(e) => check(e)}
                ref={Scroll}
                showsHorizontalScrollIndicator={false}
              >
                <Description
                  Description={
                    I18nManager.isRTL ? items.DescriptionAr : items.Description
                  }
                  Data={isPoints.D}
                />
                <Rules
                  Rules={I18nManager.isRTL ? items.RulesAr : items.Rules}
                  Data={isPoints.R}
                />

                {items.Training === '' && items.TrainingAr === '' ? null : (
                  <Tranining
                    Training={
                      I18nManager.isRTL ? items.TrainingAr : items.Training
                    }
                    Data={isPoints.T}
                  />
                )}
              </ScrollView>
            </View>
          )}
          {/* {isSelected === 0 ? <Description /> : isSelected === 1 ? <Rules /> : null} */}
        </View>
      </ScrollView>
      <View style={styles.ButtonView}>
        {items.Status === 'active' && !store.data.banned ? (
          <TouchableOpacity
            style={styles.Button}
            onPress={() =>
              navigation.navigate('ApplyToJob', { items, shifts: isShifts })
            }
          >
            <Text style={styles.ButtonText}>
              {SingleJobStrings.Application}
            </Text>
          </TouchableOpacity>
        ) : !store.data.banned ? (
          <TouchableOpacity
            style={[
              styles.ButtonDisabled,
              { borderColor: '#cccccc', backgroundColor: '#cccccc' },
            ]}
            disabled={true}
            onPress={() =>
              navigation.navigate('ApplyToJob', { items, shifts: isShifts })
            }
          >
            <Text style={styles.ButtonText}>{SingleJobStrings.EventEnded}</Text>
          </TouchableOpacity>
        ) : store.data.banned ? (
          <TouchableOpacity
            style={[
              styles.ButtonBanned,
              { borderColor: '#cccccc', backgroundColor: 'transparent' },
            ]}
            disabled={true}
          >
            <Text style={styles.ButtonTextBanned}>
              {SingleJobStrings.Banned}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

export default inject('store')(observer(SingleJob));
