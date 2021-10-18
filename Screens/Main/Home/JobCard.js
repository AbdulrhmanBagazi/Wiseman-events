import React from 'react';
import {
  View,
  Text,
  Animated,
  FlatList,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import styles from './Style';
import Icon from '../../../Config/Icons';
import { PrimaryColor } from '../../../Config/ColorPalette';
import AnimatedCardImageLoad from './AnimatedComponets/AnimatedCardImageLoad';
import { SingleJobStrings, ErrorsStrings } from '../../../Config/Strings';
import { width } from '../../../Config/Layout';
import moment from 'moment';
import 'moment/locale/ar-sa'; // without this line it didn't work
moment.updateLocale('ar-sa', {
  months: [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
  ],
});

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

function JobCard(props) {
  const [isFade, setFade] = React.useState(true);
  const [Fade] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (isFade === true) {
      Animated.timing(Fade, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      setFade(false);
      return;
    }

    return;
  });

  function getSalary(val) {
    if (val.jobs.length > 1) {
      var first = val.jobs[0].hourly_rate ? val.jobs[0].hourly_rate : '';
      var last = val.jobs[val.jobs.length - 1].hourly_rate
        ? val.jobs[val.jobs.length - 1].hourly_rate
        : null;
      return (
        <Text style={styles.SingleJobDetailsSectionsValue}>
          {Number(last)}
          {I18nManager.isRTL ? 'ريال ' : ' SAR'}
          {Number(first) ? ' - ' : null} {Number(first)}
          {I18nManager.isRTL ? 'ريال ' : ' SAR'}
          <Text style={styles.Hour}>
            /{I18nManager.isRTL ? 'الساعة' : 'Hour'}
          </Text>
        </Text>
      );
    } else if (val.jobs.length === 1) {
      var first = val.jobs[0].hourly_rate ? val.jobs[0].hourly_rate : '';

      return (
        <Text style={styles.SingleJobDetailsSectionsValue}>
          {Number(first)}
          {I18nManager.isRTL ? 'ريال ' : ' SAR'}
          <Text style={styles.Hour}>
            /{I18nManager.isRTL ? 'الساعة' : 'Hour'}
          </Text>
        </Text>
      );
    } else {
      return (
        <Text style={styles.SingleJobDetailsSectionsValue}>
          {ErrorsStrings.noInfo}
        </Text>
      );
    }
  }

  return (
    <View style={styles.JobCard}>
      <View style={styles.space} />
      <View style={styles.Section}>
        <View style={styles.SectionTtitle}>
          <Text style={styles.SectionTitle}>
            {I18nManager.isRTL
              ? 'وظائف في' + ' ' + props.TitleAr
              : 'Jobs at' + ' ' + props.Title}
          </Text>
          {/* <Text style={styles.NumberOfJobs}>
            {I18nManager.isRTL
              ? 'وظيفة ' + props.Total
              : 'Jobs  ' + props.Total}
          </Text> */}
        </View>
        <View style={styles.SectionMore}>
          <TouchableOpacity
            style={styles.SectionMoreButton}
            onPress={() => props.More('AllJobs', { id: props.ID })}
          >
            <Text style={styles.JobsMore}>
              {I18nManager.isRTL ? 'المزيد' : 'More'}
            </Text>
            <Icon
              name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'}
              size={14}
              color={PrimaryColor}
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={props.data}
        pagingEnabled={true}
        style={styles.MainjobsView}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <AnimatedTouchableOpacity
            style={[
              styles.SingleJob,
              {
                opacity: Fade,
                width: props.data.length > 1 ? width - 5 : width + 10,
              },
            ]}
            onPress={() => props.click('SingleJob', { items: item })}
          >
            <AnimatedCardImageLoad
              source={{
                uri: item.ImageURL,
              }}
              Name={I18nManager.isRTL ? item.NameAr : item.Name}
              EventStatus={item.Status}
            />
            <View style={styles.SingleJobDetails}>
              <Text style={styles.SingleJobDetailsTime}>
                {SingleJobStrings.date}
                {item.Start && item.End ? (
                  <Text style={styles.BlackColor}>
                    {I18nManager.isRTL
                      ? moment(item.Start).format('Do MMM') +
                        ' - ' +
                        moment(item.End).format('Do MMM')
                      : moment(item.Start).locale('en').format('Do MMM') +
                        ' - ' +
                        moment(item.End).locale('en').format('Do MMM')}
                  </Text>
                ) : (
                  <Text style={styles.BlackColor}>{ErrorsStrings.noInfo}</Text>
                )}
              </Text>
              <Text style={styles.SingleJobDetailsTitle} numberOfLines={1}>
                {I18nManager.isRTL ? item.TitleAr : item.Title}
              </Text>
              <View style={styles.SingleJobDetailsLocationView}>
                <Icon name="map-pin" size={14} color="#000" />
                <Text style={styles.SingleJobDetailsLocation} numberOfLines={1}>
                  {I18nManager.isRTL ? item.LocationAr : item.Location}
                </Text>
              </View>
              <View style={styles.SingleJobDetailsDataView}>
                {/* <View style={styles.DataSections}>
                  <Text style={styles.SingleJobDetailsSections}>{SingleJobStrings.Vacancy}</Text>
                  <Text style={styles.SingleJobDetailsSectionsValue}>{item.Employees}</Text>
                </View> */}
                <View style={styles.DataSections}>
                  <Text style={styles.SingleJobDetailsSections}>
                    {SingleJobStrings.Shifts}
                  </Text>
                  <Text style={styles.SingleJobDetailsSectionsValue}>
                    {item.eventshifts.length}
                  </Text>
                </View>
                <View style={styles.DataSections}>
                  <Text style={styles.SingleJobDetailsSections}>
                    {SingleJobStrings.Salary}
                  </Text>
                  {getSalary(item)}
                </View>
              </View>
            </View>
          </AnimatedTouchableOpacity>
        )}
      />
    </View>
  );
}

export default JobCard;
