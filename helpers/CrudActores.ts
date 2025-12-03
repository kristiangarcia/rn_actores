import { Platform } from "react-native";
import { Actor, ActorCompleto, Actores, DatosFormulario } from "../model/Tipos";
import { request, gql } from "graphql-request";

const IP = Platform.OS === "android" ? "10.0.2.2" : "localhost"
const URL = `http://${IP}:3000/graphql`

export async function consultarActores(): Promise<Actores> {
    const sentencia = gql`
        query consultarActores {
            allActors {
                id
                urlFoto:imageUrl
            }
        }
    `
    const respuesta = await request(URL, sentencia)
    return respuesta.allActors
}

export async function completarActor(actor: Actor): Promise<ActorCompleto> {
    const consulta = gql`
        query consultarActor($id:ID!) {
            Actor(id:$id) {
                activo:active
                biografia:bio
                fechaNacimiento:birthdate
                id
                urlFoto:imageUrl
                peliculas:movies
                nombre:name
            }
        }
    `
    const variables = { id: actor.id }
    const respuesta = await request(URL, consulta, variables)
    return respuesta.Actor
}

export async function modificarActor(idActor: string, datos: DatosFormulario): Promise<Actor> {
    const sentencia = gql`
        mutation modificarActor(
            $id: ID!
            $nombre: String
            $biografia: String
            $urlFoto: String
            $activo: Boolean
            $fechaNacimiento: String
            $peliculas: [String]
        ) {
        updateActor(
            id: $id
            birthdate: $fechaNacimiento
            bio: $biografia
            active: $activo
            imageUrl: $urlFoto
            movies: $peliculas
            name: $nombre
        ) {
            id
            nombre: name
            urlFoto: imageUrl
            }
        }
    `

    const variables = {
        ...datos,
        id: idActor,
    };

    const respuesta = await request(URL, sentencia, variables)
    return respuesta.updateActor;
}

export async function crearActor(datos: DatosFormulario): Promise<Actor> {
    const sentencia = gql`
        mutation crearActor(
            $nombre: String
            $biografia: String
            $urlFoto: String
            $activo: Boolean
            $fechaNacimiento: String
            $peliculas: [String]
        ) {
        createActor(
            active: $activo
            bio: $biografia
            birthdate: $fechaNacimiento
            imageUrl: $urlFoto
            movies: $peliculas
            name: $nombre
            ) {
            id
            nombre: name
            urlFoto: imageUrl
            }
        }
    `

    const respuesta = await request(URL, sentencia, datos)
    return respuesta.createActor;
}

export async function borrarActor(idActor: string): Promise<string> {
    const sentencia = gql`
        mutation borrarActor($id: ID!) {
            deleteActor(id: $id) {
            id
            }
        }
    `

    const variables = {
        id: idActor
    }

    const respuesta = await request(URL, sentencia, variables);
    return respuesta.deleteActor.id
}