import React, { useState } from "react";
import { Text, View, TextInput, ScrollView, KeyboardAvoidingView, Platform, Dimensions, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import CustomButton from "@/components/CustomButton";
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment"; // To format the date
import { useSignUp } from '@clerk/clerk-expo'
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

const SignUp = () => {
  const navigation = useNavigation();
  const { isLoaded, signUp, setActive } = useSignUp()

  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress,] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // State for date picker visibility
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  const handlePress = () => {
    navigation.navigate('/(auth)/sign-in');
  };

  const handleConfirm = (date:any) => {
    setBirthDate(moment(date).format("YYYY-MM-DD")); // Format the date
    setDatePickerVisibility(false);
  };

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setPendingVerification(true)
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2))
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f57c00" }} >
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 ,paddingTop:40}}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ 
          backgroundColor: "white", 
          paddingHorizontal: width * 0.06, 
          paddingVertical: height * 0.04, 
          borderTopLeftRadius: 64,
          flex: 1
        }}>
          <View>
            <Text style={{ fontSize: width * 0.07, fontWeight: "bold", color: "#f57c00", textAlign: "center" }}>
              Create new{"\n"}Account
            </Text>
            
            <Text style={{ textAlign: "center", color: "#666", marginVertical: height * 0.01 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text> Already Registered? </Text>
                <TouchableOpacity onPress={handlePress}>
                  <Text style={{ color: "#f57c00" }}>Log in here.</Text>
                </TouchableOpacity>
              </View>
            </Text>

            <View style={{ marginVertical: height * 0.02 }}>
              {/* Full Name Field */}
              <Text style={{ marginBottom: height * 0.005, color: '#8f8e8e' }}>FULL NAME</Text>
              <TextInput
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
                style={{ padding: height * 0.015, borderRadius: 15, marginBottom: height * 0.015, backgroundColor: "#f0f0f0" }}
                selectionColor="#f57c00"
              />

              {/* Email Field */}
              <Text style={{ marginBottom: height * 0.005, color: '#8f8e8e' }}>EMAIL</Text>
              <TextInput
                placeholder="Email"
                value={emailAddress}
                onChangeText={setEmailAddress}
                style={{ padding: height * 0.015, borderRadius: 15, marginBottom: height * 0.015, backgroundColor: "#f0f0f0" }}
                keyboardType="email-address"
                selectionColor="#f57c00"
              />

              {/* Password Field */}
              <Text style={{ marginBottom: height * 0.007, color: '#8f8e8e' }}>PASSWORD</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#f0f0f0', borderRadius: 15, backgroundColor: "#f0f0f0" ,marginBottom:10 }}>
                <TextInput
                  placeholder="Password"
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

              {/* Confirm Password Field */}
              <Text style={{ marginBottom: height * 0.007, color: '#8f8e8e' }}>CONFIRM PASSWORD</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#f0f0f0', borderRadius: 15, backgroundColor: "#f0f0f0" ,marginBottom:10 }}>
                <TextInput
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  style={{ flex: 1, padding: height * 0.015, borderRadius: 15, backgroundColor: "transparent" }}
                  secureTextEntry={!showConfirmPassword}
                  selectionColor="#f57c00"
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={{ marginRight: 10 }}>
                  <Icon name={showConfirmPassword ? "eye-off" : "eye"} size={22} color="#f57c00" />
                </TouchableOpacity>
              </View>

              {/* Birth Date Field */}
              <Text style={{ marginBottom: height * 0.005, color: '#8f8e8e' }}>BIRTH DATE</Text>
              <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={{ 
                padding: height * 0.015, 
                borderRadius: 15, 
                backgroundColor: "#f0f0f0", 
                marginBottom: height * 0.015,
                justifyContent: "center",
              }}>
                <Text>{birthDate ? birthDate : "Select Birth Date"}</Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => setDatePickerVisibility(false)}
                // Optional: Set the initial date
                date={new Date()}
                className="text-red-200"
                
              />
            </View>

            {/* CustomButton for Sign Up */}
            <CustomButton
              // onPress={handleSignUp}
              title="Sign up"
              buttonStyle={{ backgroundColor: "#f57c00", padding: height * 0.02 }}
              textStyle={{ color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: width * 0.045 }}
              className="bg-primary-100 rounded-md"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
