import { services } from "@/services";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export function useIndex(){
	const [selected, setSelected] = useState<string[]>([]);
	const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);
	function handleToggleSelected(value: string){
		if(selected.includes(value)) {
			return setSelected((state) => state.filter((item)=> item !== value));
		}
		setSelected((state)=>[...state,value]);
	}
	function handleClear(){
		Alert.alert("Limpar","Deseja limpar tudo?",[
			{text: "Não", style:"cancel"},
			{text: "Sim", onPress:() => setSelected([])}
		]);
	}
	function handleSearch(){
		router.navigate("/recipes/"+selected);
	}
	useEffect(()=>{
		services.ingredientes.findAll().then(setIngredients);
	},[]);
	return {
		selected,
		ingredients,
		handleClear,
		handleSearch,
		handleToggleSelected
	};
}