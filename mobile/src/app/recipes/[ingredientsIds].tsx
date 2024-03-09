import { FlatList, Text, View } from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Recipe } from "@/components/Recipe";
import { useEffect, useState } from "react";
import { services } from "@/services";
import { Ingredients } from "@/components/Ingretients";

export default function Recipes(){
	const params = useLocalSearchParams<{ingredientsIds : string}>();
	const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);
	const [recipes, setRecipes] = useState<RecipeResponse[]>([]);
	const ingredientsIds = params.ingredientsIds.split(",");
	function handleBack(){
		router.back();
	}
	useEffect(()=>{
		services.ingredientes.findByIds(ingredientsIds)
			.then((response) => {
				response.map((resp) => {
					resp.image = `${services.storage.imagePath}${resp.image}`;
					return resp;
				});
				setIngredients(response);
			});
	}, []);
	useEffect(()=>{
		services.recipes.findByIngredientsIds(ingredientsIds).then(setRecipes);
	}, []);
	return(
		<View style={styles.container}>
			<View style={styles.header}>
				<MaterialIcons name="arrow-back" size={32} onPress={handleBack} />
				<Text style={styles.title}>Ingredientes</Text>
			</View>
			<Ingredients ingredients={ingredients} />
			<FlatList 
				data={recipes}
				keyExtractor={item=>item.id}
				renderItem={({ item })=><Recipe recipe={item}  onPress={()=>router.navigate(`/recipe/${item.id}`)}/>}
				style={styles.recipes}
				contentContainerStyle={styles.recipesContent}
				showsVerticalScrollIndicator={false}
				columnWrapperStyle={{ gap: 16 }}
				numColumns={2}
			/>
		</View>
	);
}