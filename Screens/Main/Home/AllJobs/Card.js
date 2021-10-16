import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import styles from '../Style';
import Icon from '../../../../Config/Icons';
import AnimatedCardImageLoad from '../AnimatedComponets/AnimatedCardImageLoad';
import { SingleJobStrings, ErrorsStrings } from '../../../../Config/Strings';
import moment from 'moment';
import 'moment/locale/ar-sa'; // without this line it didn't work

function Card(props) {
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

  function getTime(val) {
    moment.locale(I18nManager.isRTL ? 'ar-sa' : 'en');
    var artimeStart = moment(val.Start).format('Do MMM');
    var artimeEnd = moment(val.End).format('Do MMM');

    moment.updateLocale('ar', {
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

    return (
      <Text style={styles.BlackColor}>
        {val.Start && val.End
          ? artimeStart + ' - ' + artimeEnd
          : ErrorsStrings.noInfo}
      </Text>
    );
  }

  return (
    <View style={styles.AllJobCard}>
      <FlatList
        data={props.Data}
        showsVerticalScrollIndicator={false}
        style={styles.AllJobFlatlist}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.SingleAllJob}
            onPress={() => props.click('SingleJob', { items: item })}
          >
            <AnimatedCardImageLoad
              source={{
                uri: item.ImageURL,
              }}
              Name={I18nManager.isRTL ? item.NameAr : item.Name}
              EventStatus={item.Status}
            />
            <View style={styles.AllSSingleJobDetails}>
              <Text style={styles.SingleJobDetailsTime}>
                {SingleJobStrings.date}
                <Text style={styles.BlackColor}>{getTime(item)}</Text>
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
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

export default Card;
