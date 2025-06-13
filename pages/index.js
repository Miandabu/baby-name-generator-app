import { useState } from 'react';

export default function Home() {
  const [mode, setMode] = useState('generate');
  const [gender, setGender] = useState('');
  const [origin, setOrigin] = useState('');
  const [startsWith, setStartsWith] = useState('');
  const [theme, setTheme] = useState('');
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [results, setResults] = useState([]);

  const handleGenerate = async () => {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode, gender, origin, startsWith, theme, name1, name2 })
    });
    const data = await res.json();
    setResults(data.names || ['No names returned']);
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>👶 AI Baby Name Generator</h1>
      <div>
        <button onClick={() => setMode('generate')} style={{ marginRight: 10 }}>
          Smart Generator
        </button>
        <button onClick={() => setMode('combine')}>Name Combiner</button>
      </div>
      {mode === 'generate' ? (
        <>
          <input placeholder=\"Gender\" value={gender} onChange={e => setGender(e.target.value)} />
          <input placeholder=\"Origin\" value={origin} onChange={e => setOrigin(e.target.value)} />
          <input placeholder=\"Starts With\" value={startsWith} onChange={e => setStartsWith(e.target.value)} />
          <input placeholder=\"Theme\" value={theme} onChange={e => setTheme(e.target.value)} />
        </>
      ) : (
        <>
          <input placeholder=\"Parent Name 1\" value={name1} onChange={e => setName1(e.target.value)} />
          <input placeholder=\"Parent Name 2\" value={name2} onChange={e => setName2(e.target.value)} />
        </>
      )}
      <button onClick={handleGenerate}>
        {mode === 'generate' ? 'Generate Names' : 'Combine Names'}
      </button>
      {results.map((name, i) => (
        <div key={i}>{name}</div>
      ))}
    </div>
  );
}
