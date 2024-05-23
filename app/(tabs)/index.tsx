import { Dimensions, FlatList, ImageBackground, Pressable, ScrollView, StyleSheet, TouchableOpacity,Text, View } from 'react-native';

import { useNavigation, useRouter } from 'expo-router';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Entypo, FontAwesome6 } from '@expo/vector-icons';
import { fetchAllDataWF } from '@/context/api';
import { useAuth } from '@/context/authContext';

interface Student {
  userId: string;
  userName: string;
  schoolName: string;
  level: string;
}

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [activities, setActivities] = useState([]);
  const navigation = useNavigation();
  const router = useRouter();
  const { user, getLoggedUser } = useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerLeft: () => <Text style={styles.headerTitle}>Parent</Text>,
    });
  }, []);

  useEffect(() => {
    if (user) {
      GetStudent();
      GetActivities();
    }
  }, [user]);

  useEffect(() => {
    getLoggedUser();
  }, []);

  const GetStudent = async () => {
    try {
      const data = await fetchAllDataWF(`/student/yourStudents.php?user=${user}`, {});
      setStudents(data.user);
    } catch (e) {
      console.error('Error fetching students:', e);
    }
  };

  const GetActivities = async () => {
    try {
      const data = await fetchAllDataWF(`/details/allStudentsActivities.php?user=${user}`, {});
      setActivities(data.activity);
    } catch (e) {
      console.error('Error fetching activities:', e);
    }
  };

  return (
    <ScrollView bounces={false} style={{ height: height, backgroundColor: '#fff' }}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Student</Text>
        <FlatList
          data={students}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => router.push({
                pathname: '/noneNavScreens/user/',
                params: {
                  studentId: item?.userId,
                  studentName: item?.userName,
                  studentLevel: item?.level,
                  schoolName: item?.schoolName,
                }
              })}
              style={[styles.studentCard, { marginRight: students.length === (index + 1) ? 20 : 0 }]}
            >
              <ImageBackground
                style={styles.cardImage}
                source={require('@/assets/images/profile111.jpg')}
                resizeMode='cover'
              >
                <View style={styles.cardTextSection}>
                  <Text style={styles.cardTitle}>{item?.userName}</Text>
                  <Text style={styles.cardDesc}>{item?.schoolName}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.activitiesSection}>
        <View style={styles.sectionHeader}>
          <Text style={{ fontSize: 18, fontWeight: '600', }}>School Activities</Text>
          <Pressable>
            <Text style={styles.seeMoreLink}>See All</Text>
          </Pressable>
        </View>

        {activities && activities.map((item, index) => (
          <View style={styles.activityCard} key={index.toString()}>
            <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center', backgroundColor: 'transparent', flex: 1 }}>
              <View style={styles.iconContainer}>
                <FontAwesome6 name="people-group" size={24} color="black" />
              </View>
              <View style={styles.activityCardContent}>
                <Text style={styles.activityCardTitle}>{item.activityText} </Text>
                <Text style={styles.activityCardDate}>{item?.school}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '600',
    marginLeft: 20,
  },
  cardTextSection: {
    backgroundColor: '#D9D9D9',
    borderRadius: 6,
    width: '100%',
    padding: 15,
  },
  studentCard: {
    width: width * 60 / 100,
    height: height * 30 / 100,
    borderRadius: 8,
    overflow: 'hidden',
    marginLeft: 20,
  },
  cardImage: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  activitiesSection: {
    paddingHorizontal: 20,
    gap: 15,
    paddingVertical: 30,
  },
  section: {
    paddingTop: 30,
    gap: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    paddingLeft: 20,
  },
  cardTitle: {
    fontSize: 16,
    color: '#6A8137',
    fontWeight: '600',
  },
  cardDesc: {
    fontSize: 14,
    color: '#6A8137',
    fontWeight: '400',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  seeMoreLink: {
    fontSize: 16,
    color: '#6A8137',
    fontWeight: '400',
  },
  activityCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#D9D9D980',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#B5DBF2',
    height: 44,
    width: 44,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityCardContent: {
    backgroundColor: 'transparent',
    width: '100%',
    flex: 1,
  },
  activityCardTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
    width: '100%',
    flexWrap: 'wrap',
  },
  activityCardDate: {
    color: '#000',
    fontSize: 12,
    fontWeight: '400',
  },
});
