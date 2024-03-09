import { FlatList, View } from "react-native";
import { styles } from "./styles";
import { Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Redirect, router } from "expo-router";
import { Text } from "react-native";
import { Ingredients } from "@/components/Ingretients";
import { Step } from "@/components/Step";

import { Loading } from "@/components/Loading";
import { useRecipe } from "./useRecipe";



export default function Recipes() {
	const { id, ingredients, isLoading, preparations, recipe} = useRecipe();
	if(isLoading) {
		return <Loading />;
	}
	if(!id || !recipe) {
		return <Redirect href="/" />;
	}
	return(
		<View style={styles.container}>
			<Image source={{ uri:recipe.image}} style={styles.image} />
      
			<View style={styles.body}>
				<View style={styles.header}>
					<MaterialIcons
						size={32}
						name="arrow-back"
						onPress={()=> router.back()}
					/>
					<Text style={styles.name}>{recipe.name}</Text>
					<Text style={styles.time}>{recipe.minutes} minutos</Text>
				</View>
				<Ingredients ingredients={ingredients} />
				<View style={styles.content}>
					<Text style={styles.preparation}>Modo de Preparo</Text>
					<FlatList 
						data={preparations}
						renderItem={
							({ item }) =>( 
								<Step step={item.step} description={item.description} />
							)
						}
						contentContainerStyle={{ gap: 16 }}
						showsVerticalScrollIndicator={false}
					/>
				</View>
			</View>
		</View>
	);
}