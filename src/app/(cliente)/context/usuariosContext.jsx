"use client";

import React, { useState, createContext, useEffect  } from "react";



export const UsuariosContext = createContext({
    loged: Boolean,
    mail: "",
    pass: "",
    usuarios: [],
    pedidos: [],
    master: [],
    usuario: [],
    loadUsuarios: () => {},
    loadPedidos: () => {},
    setLog: (estado, usuario) => {},
});

export const UsuariosProvider = ({ children }) => {
    const [usuarios, setUsuarios] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");
    const [usuario, setUsuario] = useState([]);
    const [master, setMaster] = useState([]);
    //const [masterName, setMaster] = useState([]);
    const [loged, setLoged] = useState(false);
  
    useEffect(() => {
      const logedStatus = localStorage.getItem('loged');
      if (logedStatus) {
        setLoged(JSON.parse(logedStatus));
      }
      loadUsuarios();
    }, []);
  
    async function loadUsuarios() {
      const response = await fetch('api/users/');
      const data = await response.json();
      setUsuarios(data);
      const response2 = await fetch('api/master/');
      const data2 = await response2.json();
      setMaster(data2);
    }

    async function loadPedidos(mail) {
      const response = await fetch('api/pedidos/'+mail);
      const data = await response.json();
      setPedidos(data);
    }
  
    async function setLog(estado, usuario) {
      setLoged(estado);
      localStorage.setItem('loged', JSON.stringify(estado));
      setUsuario(usuario);
      setMail(usuario.email);
      setPass(usuario.pass);
    }
  
    return (
      <UsuariosContext.Provider value={{ mail, pass, loged, pedidos, usuarios, master, usuario, loadUsuarios, loadPedidos, setLog }}>
        {children}
      </UsuariosContext.Provider>
    );
  };