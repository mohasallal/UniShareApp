import { onboarding } from "@/constants";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const Home = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <View className="flex-1 w-[80%] h-[80%]  items-center justify-center bg-[#FF7A00]  rounded-b-full">
        <Swiper
          ref={swiperRef}
          loop={false}
          showsPagination={false}
          onIndexChanged={(index) => setActiveIndex(index)}
        >
          {onboarding.map((item) => (
            <View key={item.id} className="flex items-center justify-center p-5">
              <Image
                source={item.image}
                className="w-[80%] h-[60%]"
                resizeMode="contain"
              />
              <Text className="text-3xl font-bold mt-5 text-center">
                {item.title}
              </Text>
              <Text className=" text-md mt-3 text-center px-5">
                {item.description}
              </Text>
            </View>
          ))}
        </Swiper>
      </View>
      
      {/* Orange Header and Swiper Content */}

      {/* Footer with Skip, Pagination Dots, and Next/Get Started Button */}
      <View className="flex-row items-center justify-between w-full px-5 pb-10">
        {!isLastSlide && (
          <>
            {/* Skip Button */}
            <TouchableOpacity onPress={() => router.replace("../(auth)/sign-up")}>
              <Text className="text-[#FF7A00] font-semibold text-xl">Skip</Text>
            </TouchableOpacity>

            {/* Custom Pagination Dots */}
            <View className="flex-row items-center">
              {onboarding.map((_, index) => (
                <View
                  key={index}
                  className={`w-2 h-2 mx-1 rounded-full ${
                    activeIndex === index ? "bg-[#FF7A00]" : "bg-[#f57c00] opacity-25"
                  }`}
                />
              ))}
            </View>
          </>
        )}

        {/* Next/Get Started Button */}
        <TouchableOpacity
          onPress={() =>
            isLastSlide
              ? router.replace("/(auth)/sign-up")
              : swiperRef.current?.scrollBy(1)
          }
          className={`${
            isLastSlide ? "bg-[#FF7A00] py-3 px-10 rounded-full" : "bg-white border border-[#FF7A00]"
          }`}
        >
          <Text className={`font-bold text-xl ${isLastSlide ? "text-white" : "text-[#FF7A00]"}`}>
            {isLastSlide ? "GET STARTED" : "NEXT"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
