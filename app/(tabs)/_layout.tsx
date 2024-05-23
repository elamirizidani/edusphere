import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable,Text } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import RightHeaderSection from '@/components/reUsable/rightHeaderSection';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen name='index' options={{
        title:'',
        tabBarIcon:({ color }) =><Feather name="home" size={24} color={color} />,
        tabBarLabel:'Home',
        headerRight:()=><RightHeaderSection/>,
        headerStyle:{
          backgroundColor:'#6A8137',
        },
      }}/>
      <Tabs.Screen name='assignments' options={{
        title:'',
        tabBarIcon:({color})=> <MaterialIcons name="assignment-add" size={24} color={color} />,
        tabBarLabel:'Assignments',
        headerRight:()=><RightHeaderSection/>,
        headerStyle:{
          backgroundColor:'#6A8137',
        },
        href:null
      }}/>

      <Tabs.Screen name='activities' options={{
        title:'',
        tabBarIcon:({color})=> <MaterialIcons name="assignment-add" size={24} color={color} />,
        tabBarLabel:'Activities',
        headerRight:()=><RightHeaderSection/>,
        headerStyle:{
          backgroundColor:'#6A8137',
        },
      }}/>

      <Tabs.Screen name='profile' options={{
        title:'',
        tabBarIcon:({color})=> <FontAwesome name="user-o" size={24} color={color} />,
        tabBarLabel:'Profile',
        headerRight:()=><RightHeaderSection/>,
        headerStyle:{
          backgroundColor:'#6A8137',
        },
      }}/>
    </Tabs>
  );
}
