import { useState, useEffect } from 'react';

const coresDisponiveis = ['red', 'blue', 'green', 'orange', 'purple'];

function Cadastro() {
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [tarefas, setTarefas] = useState([
        "Pagar a conta de luz",
        "Estudar Programação",
        "Enviar a tarefe"
    ]);
    const [input, setInput] = useState('');
    const [corSelecionada, setCorSelecionada] = useState('');

    useEffect(() => {
        const nomeSalvo = localStorage.getItem('@nomeUsuario');
        const corSalva = localStorage.getItem('@corSelecionada');
        const tarefasStorage = localStorage.getItem('@tarefa');

        if (nomeSalvo) {
            setNomeUsuario(nomeSalvo);
        } else {
            const nome = prompt("Olá! Qual é o seu nome?");
            if (nome) {
                setNomeUsuario(nome);
                localStorage.setItem('@nomeUsuario', nome);
            }
        }

        if (corSalva) {
            setCorSelecionada(corSalva);
        }

        if (tarefasStorage) {
            setTarefas(JSON.parse(tarefasStorage));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('@tarefa', JSON.stringify(tarefas));
    }, [tarefas]);

    useEffect(() => {
        if (corSelecionada) {
            localStorage.setItem('@corSelecionada', corSelecionada);
        }
    }, [corSelecionada]);

    function handleRegistro(e) {
        e.preventDefault();
        if (input.trim() === '') return;
        setTarefas([...tarefas, input]);
        setInput('');
    }

    return (
        <div style={{ backgroundColor: corSelecionada, minHeight: '100vh', padding: '20px' }}>
            <h1>Cadastro de Tarefas</h1>
            {nomeUsuario && <h2>{nomeUsuario}, sua lista de tarefas</h2>}

            <h3>Escolha uma cor de fundo:</h3>
            {coresDisponiveis.map((cor) => (
                <label key={cor} style={{ marginRight: '10px' }}>
                    <input
                        type="radio"
                        value={cor}
                        checked={corSelecionada === cor}
                        onChange={(e) => setCorSelecionada(e.target.value)}
                    />
                    {cor}
                </label>
            ))}

            <form onSubmit={handleRegistro}>
                <br />
                <label>Nome da Tarefa: </label><br />
                <input
                    placeholder='Digite uma tarefa'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                /><br />
                <button type='submit'>Registrar</button>
            </form>

            <br />
            <ul>
                {tarefas.map((tarefa, index) => (
                    <li key={index}>{tarefa}</li>
                ))}
            </ul>
        </div>
    );
}

export default Cadastro;
