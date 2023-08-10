import React, { useState, useEffect } from 'react';



const AdminPage = () => {
  const [players, setPlayers] = useState([]);

  // Simule la récupération des données des joueurs depuis une API
  useEffect(() => {
    // Remplacez cette partie par la logique de récupération des données réelles
    const mockPlayers = [
      { id: 1, username: 'Joueur1', email: 'joueur1@example.com', score: 20 },
      { id: 2, username: 'Joueur2', email: 'joueur2@example.com', score: 25 },
      // ...
    ];
    setPlayers(mockPlayers);
  }, []);

  // Configuration des colonnes du tableau
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Nom d\'utilisateur', dataIndex: 'username', key: 'username' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Score', dataIndex: 'score', key: 'score' },
  ];

  return (
    <div className="admin-page">
      <h2>Tableau des Joueurs</h2>
      <Table dataSource={players} columns={columns} />
    </div>
  );
};

export default AdminPage;
