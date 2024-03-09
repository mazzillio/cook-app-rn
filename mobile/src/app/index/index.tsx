import { ScrollView, Text, View } from "react-native";
import { styles } from "./styles";
import { Ingredient } from "@/components/Ingredient";
import { Selected } from "@/components/Selected";

import { services } from "@/services";
import { useIndex } from "./useIndex";

export default function Index(){
	const { ingredients, selected, handleClear, handleSearch, handleToggleSelected} = useIndex();
	return(
		<View style={styles.container}>
			<Text style={styles.title}>
        Escolha {"\n"}
				<Text style={styles.subtitle}>os produtos</Text>
			</Text>
			<Text style={styles.message}>
        Descubra receitas baseadas nos produtos que voce escolheu.
			</Text>
			<ScrollView contentContainerStyle={styles.ingredients} showsVerticalScrollIndicator={false}>
				{
					ingredients.map((item)=>(
						<Ingredient 
							key={item.id}
							name={item.name}
							image={`${services.storage.imagePath}${item.image}`}
							selected={selected.includes(item.id)}
							onPress={()=>handleToggleSelected(item.id)}
						/>
					))
				}
			</ScrollView>
			{ selected.length > 0 && (
				<Selected 
					quantity={selected.length} 
					onClear={handleClear} 
					onSearch={handleSearch}
				/>
			)
			}
		</View>
	);
}