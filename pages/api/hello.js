// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { query } from "../lib/db";

export async function POST(request) {
    try {
        const users = await query({
            query: "SELECT * FROM login",
            values: [],
        });

        let data = JSON.stringify(users);
        return new Response(data, {
            status: 200,
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        return new Response(JSON.stringify({
            status: 500,
            message: 'Erreur lors de la récupération des données'
        }));
    }
}

export async function POST(request) {
    try {
        const { nom, mdp, rol } = await request.json();
        const result = await query({
            query: "INSERT INTO login (nom, mdp, rol) VALUES (?, ?, ?)",
            values: [nom, mdp, rol],
        });

        return new Response(JSON.stringify({
            message: 'success',
            status: 200,
            product: result,
        }));
    } catch (error) {
        console.error('Erreur lors de l\'insertion des données :', error);
        return new Response(JSON.stringify({
            status: 500,
            message: 'Erreur lors de l\'insertion des données'
        }));
    }
}

export async function PUT(request) {
    try {
        const { ID, nom, mdp, rol } = await request.json();
        const result = await query({
            query: "UPDATE login SET nom = ?, mdp = ?, rol = ? WHERE ID = ?",
            values: [nom, mdp, rol, ID],
        });

        return new Response(JSON.stringify({
            message: 'success',
            status: 200,
            product: result,
        }));
    } catch (error) {
        console.error('Erreur lors de la mise à jour des données :', error);
        return new Response(JSON.stringify({
            status: 500,
            message: 'Erreur lors de la mise à jour des données'
        }));
    }
}

export async function DELETE(request) {
    try {
        const { ID } = await request.json();
        const result = await query({
            query: "DELETE FROM login WHERE ID = ?",
            values: [ID],
        });

        return new Response(JSON.stringify({
            message: 'success',
            status: 200,
            product: result,
        }));
    } catch (error) {
        console.error('Erreur lors de la suppression des données :', error);
        return new Response(JSON.stringify({
            status: 500,
            message: 'Erreur lors de la suppression des données'
        }));
    }
}