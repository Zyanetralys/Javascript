<!DOCTYPE html>
<html>
<head>
  <title>Canción</title>
</head>
<body>
  <h1>⚔️ Himno ⚔️</h1>
  <button onclick="playHymn()">Reproducir Himno</button>

  <script>
    function playHymn() {
      const context = new (window.AudioContext || window.webkitAudioContext)();

      // Patrón de notas: frecuencia en Hz y duración en ms
      const hymn = [
        // Intro fuerte y grave
        { freq: 130.81, duration: 400 }, // C3
        { freq: 164.81, duration: 400 }, // E3
        { freq: 196.00, duration: 400 }, // G3
        { freq: 261.63, duration: 400 }, // C4

        // Secuencia agresiva
        { freq: 196.00, duration: 300 },
        { freq: 220.00, duration: 300 },
        { freq: 246.94, duration: 300 },
        { freq: 261.63, duration: 300 },

        // Clímax épico
        { freq: 329.63, duration: 200 },
        { freq: 392.00, duration: 200 },
        { freq: 440.00, duration: 400 },
        { freq: 523.25, duration: 400 },
        { freq: 659.25, duration: 400 },
        { freq: 783.99, duration: 500 },

        // Final implacable
        { freq: 392.00, duration: 500 },
        { freq: 329.63, duration: 500 },
        { freq: 261.63, duration: 700 }
      ];

      let startTime = context.currentTime;

      hymn.forEach(note => {
        const oscillator = context.createOscillator();
        oscillator.type = 'square'; // onda cuadrada = sonido agresivo
        oscillator.frequency.setValueAtTime(note.freq, startTime);

        // Añadimos un pequeño efecto de volumen descendente para que suene más épico
        const gainNode = context.createGain();
        gainNode.gain.setValueAtTime(0.9, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.1, startTime + note.duration / 1000);

        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        oscillator.start(startTime);
        oscillator.stop(startTime + note.duration / 1000);
        startTime += note.duration / 1000;
      });
    }
  </script>
</body>
</html>
