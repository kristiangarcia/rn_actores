import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';

type ToolbarProps = {
    abrirFormularioNuevoActor: () => void
}

export default function Toolbar({abrirFormularioNuevoActor}:ToolbarProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Todo Actores</Text>
            <Pressable onPress={abrirFormularioNuevoActor}>
                <MaterialIcons name={"add"} size={24} color={"white"} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 56,
        backgroundColor: '#a9aac7',
        paddingHorizontal: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titulo: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    }
})