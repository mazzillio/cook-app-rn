import { ScrollView } from "react-native";
import { Ingredient, IngredientesProps } from "@/components/Ingredient";
import { styles } from "./styles";

type Props = {
  ingredients: IngredientesProps[]
}

export function Ingredients({ ingredients }:Props) {
	return(
		<ScrollView
			horizontal
			style={styles.container}
			contentContainerStyle={styles.ingredientsContent}
			showsHorizontalScrollIndicator={false}
		>
			{
				ingredients.length > 0 && ingredients.map((ingredient)=>(
					<Ingredient 
						key={ingredient.name}
						name={ingredient.name}
						image={ingredient.image}
					/>
				))
			}
		</ScrollView>
	);
}