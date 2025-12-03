import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Actor } from '../model/Tipos'
import { Image } from 'expo-image'

type VisorActorProps = {
    actor: Actor,
    seleccionarActor: (actor: Actor) => void
}

export default function VisorActor({ actor, seleccionarActor }: VisorActorProps) {
    const [errorCarga, setErrorCarga] = useState(false);
    const imagenError = require('../assets/error.jpg')
    const imagenCarga = require('../assets/loading.jpg')
    useEffect( () => setErrorCarga(false), [actor] )

    return (
        <Pressable onPress={() => seleccionarActor(actor)}>
            <Image
                source={errorCarga ? imagenError : actor.urlFoto}
                placeholder={imagenCarga}
                style={{ width: 150, height: 200 }}
                transition={800}
                onError={() => setErrorCarga(true)}
            />
        </Pressable>
    )
}

const styles = StyleSheet.create({})