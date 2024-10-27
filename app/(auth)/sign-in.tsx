import React, { useState } from "react";
import { Text, View, TextInput, ScrollView, KeyboardAvoidingView, Platform, Dimensions, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import CustomButton from "@/components/CustomButton";
import Icon from 'react-native-vector-icons/Ionicons';
import  FontAwesome  from 'react-native-vector-icons/FontAwesome'; // For Facebook icon
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons'; // For Apple icon
import logo from '@/assets/images/Logo-Login.png'
import { useSignIn } from "@clerk/clerk-react";
import { useRouter } from "expo-router";
const { width, height } = Dimensions.get("window");

const SignIn = () => {
  const navigation = useNavigation();
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, setActive, isLoaded } = useSignIn()

  const router = useRouter()


  const handlePress = () => {
    navigation.navigate('(auth)/sign-up');
  };
  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }, [isLoaded, email, password])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f57c00" }} >
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 ,paddingTop:40}}>
      <Image
        source={logo}
        style={{
          position:'absolte',
          top:"-3%",
          left: "30%",
          width: width * 0.4,
          height: height * 0.2,
          resizeMode: 'contain',
        }}
        className='bg-white rounded-lg'
      />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ 
          backgroundColor: "white", 
          paddingHorizontal: width * 0.06, 
          paddingVertical: height * 0.04, 
          borderTopRightRadius: 64,
          flex: 1
        }}>
          
          <View>
            <Text style={{ fontSize: width * 0.08, fontWeight: "bold", color: "#f57c00", textAlign: "center" }}>
              Login
            </Text>
            <Text className="text-center text-xs text-primary-600">
              Sign in to continue
            </Text>
            <View style={{ marginVertical: height * 0.02 }}>
              {/* Email Field */}
              <Text style={{ marginBottom: height * 0.005, color: '#8f8e8e' }}>USER NAME</Text>
              <TextInput
                placeholder="User name"
                value={fullName}
                onChangeText={setEmail}
                style={{ padding: height * 0.015, borderRadius: 15, marginBottom: height * 0.015, backgroundColor: "#f0f0f0" }}
                keyboardType="email-address"
                selectionColor="#f57c00"
              />

              {/* Password Field */}
              <Text style={{ marginBottom: height * 0.007, color: '#8f8e8e' }}>PASSWORD</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#f0f0f0', borderRadius: 15, backgroundColor: "#f0f0f0", marginBottom: 10 }}>
                <TextInput
                  placeholder="******"
                  value={password}
                  onChangeText={setPassword}
                  style={{ flex: 1, padding: height * 0.015, borderRadius: 15, backgroundColor: "transparent" }}
                  secureTextEntry={!showPassword}
                  selectionColor="#f57c00"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ marginRight: 10 }}>
                  <Icon name={showPassword ? "eye-off" : "eye"} size={22} color="#f57c00" />
                </TouchableOpacity>
              </View>
            </View>

            {/* CustomButton for Sign Up */}
            <CustomButton
              title="Log In"
              buttonStyle={{ backgroundColor: "#f57c00", padding: height * 0.02 }}
              textStyle={{ color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: width * 0.045 }}
              className="bg-primary-100 rounded-md"
            />
          </View>

          <View>
            <Text className="text-center text-xs text-primary-600 my-4">
              Or sign In with
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
              {/* Google Sign In Button */}
              <TouchableOpacity style={{ marginHorizontal: 10 }}>
                <Icon name="logo-google" size={24} color="#000000" />
              </TouchableOpacity>
              
              {/* Facebook Sign In Button */}
              <TouchableOpacity style={{ marginHorizontal: 10 }}>
                <FontAwesome name="facebook" size={24} color="#000000" />
              </TouchableOpacity>
              
              {/* Apple Sign In Button */}
              <TouchableOpacity style={{ marginHorizontal: 10 }}>
                <MaterialCommunityIcons name="apple" size={24} color="#000000" />
              </TouchableOpacity>
            </View>
            <Text className='text-center text-primary-100'>
              Forget Password?
            </Text>
            <TouchableOpacity onPress={handlePress}>
                <Text style={{ color: "#f57c00" }} className='text-center my-2'>Signup</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
