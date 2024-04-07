import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native"
import { useEffect, useState } from "react";
import MyStyle from "../../styles/MyStyle";
import Apis, { endpoints } from "../../Apis";
import moment from "moment";
import { TouchableOpacity } from "react-native";

const Home = ({route, navigation}) => {
    const [courses, setCourses] = useState(null);
    const cateId = route.params?.cateId;

    useEffect(()=>{
        let url = endpoints['courses'];
        if(cateId !== undefined&&cateId !== ""){
            url = `${url}?category_id=${cateId}`;
        }
        const loadCourse = async () => {
            const res = await Apis.get(url);//?category_id=
            setCourses(res.data.results)
        }
        loadCourse();
    },[cateId]);

    const goToLesson = (courseId) => {
        navigation.navigate("Lesson", {"courseId": courseId})
    }

    return <View style={MyStyle.container}>
        <Text style={[MyStyle.subject, {textAlign: "center"}]}>DANH SÁCH KHÓA HỌC</Text>
        {courses===null?<ActivityIndicator color={'green'}/>:<ScrollView>
            {courses.map(c=>(
                <View key={c.id} style={[MyStyle.row, {padding: 5}]}>
                    <View>
                        <TouchableOpacity onPress={()=>goToLesson(c.id)}>
                            <Image style={{width: 100, height: 100}} source={{uri: c.image}}/>
                        </TouchableOpacity>
                        
                    </View>
                    <View>
                        <TouchableOpacity onPress={()=>goToLesson(c.id)}>
                            <Text style={MyStyle.title}>{c.name}</Text>
                            <Text style={{marginLeft: 5}}>{moment(c.created_date).fromNow()}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </ScrollView>}
    </View>
}

export default Home;