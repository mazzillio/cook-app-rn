import { services } from "@/services";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export function useRecipe(){
	const [isLoading, setIsLoading] = useState(true);
	const [recipe, setRecipe] = useState<RecipeResponse | null>(null);
	const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);
	const [preparations, setPreparations] = useState<PreparationsResponse[]>([]);
	const { id } = useLocalSearchParams<{ id: string}>();
	useEffect(()=> {
		Promise.all([
			services.recipes.show(id),
			services.ingredientes.findByRecipeId(id),
			services.preparations.findByRecipeId(id)
		])
			.then(([recipesResponse,ingredientsResponse,preparationsResponse])=>{
				setRecipe(recipesResponse);
				setIngredients(ingredientsResponse);
				setPreparations(preparationsResponse);
			})
			.finally(()=>setIsLoading(false));
	}, []);
	return {
		isLoading,
		recipe,
		ingredients,
		preparations,
		id
	};
}