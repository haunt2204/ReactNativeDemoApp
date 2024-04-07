import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView,DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import { useEffect, useState } from 'react';
import Apis, { endpoints } from './Apis';
import Lesson from './components/Lesson/Lesson';
import LessonDetail from './components/Lesson/LessonDetail';


const Drawer = createDrawerNavigator();

export default App = ()=>{
  return <NavigationContainer>
    <Drawer.Navigator drawerContent={MyDrawerContent}>
      <Drawer.Screen name='Home' component={Home} options={{title: "Trang chủ", headerStyle: {backgroundColor: "lightblue"}}}></Drawer.Screen>
      <Drawer.Screen name='Login' component={Login} options={{title: "Đăng nhập"}}/>
      <Drawer.Screen name='Lesson' component={Lesson} options = {{title: "Danh sách bài học", drawerItemStyle: {display: "none"}}}/>
      <Drawer.Screen name='LessonDetail' component={LessonDetail} options ={{title: "Chi tiết bài học", drawerItemStyle: {display: "none"}}}/>
    </Drawer.Navigator>
  </NavigationContainer>
}

const MyDrawerContent = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    const loadCategory = async ()=>{
      const res = await Apis.get(endpoints['categories']);
      setCategories(res.data)
    }
    loadCategory();
  }, [])

  return <DrawerContentScrollView {...props}>
    <DrawerItemList {...props}/>
    {categories.map(c=><DrawerItem label={c.name} key={c.id} onPress={()=>props.navigation.navigate("Home", {cateId: c.id})}></DrawerItem>)}
  </DrawerContentScrollView>
}