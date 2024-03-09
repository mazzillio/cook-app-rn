import { Image, Pressable, Text, PressableProps } from "react-native";
import { styles } from "./styles";

export type IngredientesProps = {
  name: string
  image:string
  selected?:boolean
} & PressableProps
export function Ingredient({name, image, selected = false, ...rest}:IngredientesProps){
	return(
		<Pressable style={[styles.container, selected && styles.selected]} {...rest}>
			<Image source={{ uri:image}} style={styles.image}/>
			<Text style={styles.title}>{name}</Text>
		</Pressable>
	);
}