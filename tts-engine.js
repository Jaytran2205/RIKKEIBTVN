/**
 * TEXT-TO-SPEECH ENGINE - ALL IN ONE
 * Hệ thống chuyển văn bản thành giọng nói với nhiều giọng đọc
 * Hỗ trợ: Web Speech API, Azure TTS, Google TTS
 */

const TTSEngine = (function() {
  'use strict';

  // ========================================================
  // 1. CẤU HÌNH & DANH SÁCH GIỌNG ĐỌC
  // ========================================================

  const VIETNAMESE_VOICES = [
    // Giọng nữ
    { id: 'vi-VN-HoaiMyNeural', name: 'Hoài My (Nữ - Miền Bắc)', gender: 'female', region: 'north', provider: 'azure', quality: 'high' },
    { id: 'vi-VN-NamMinhNeural', name: 'Nam Minh (Nam - Miền Bắc)', gender: 'male', region: 'north', provider: 'azure', quality: 'high' },
    { id: 'vi-VN-Wavenet-A', name: 'Google Nữ A', gender: 'female', region: 'standard', provider: 'google', quality: 'high' },
    { id: 'vi-VN-Wavenet-B', name: 'Google Nam B', gender: 'male', region: 'standard', provider: 'google', quality: 'high' },
    { id: 'vi-VN-Wavenet-C', name: 'Google Nữ C', gender: 'female', region: 'standard', provider: 'google', quality: 'high' },
    { id: 'vi-VN-Wavenet-D', name: 'Google Nam D', gender: 'male', region: 'standard', provider: 'google', quality: 'high' },
    // Web Speech API (built-in browser)
    { id: 'browser-vi-VN', name: 'Giọng trình duyệt (Miễn phí)', gender: 'female', region: 'standard', provider: 'browser', quality: 'medium' }
  ];

  let state = {
    currentVoice: 'browser-vi-VN',
    speed: 1.0,
    pitch: 1.0,
    volume: 1.0,
    isPlaying: false,
    isPaused: false,
    currentText: '',
    synthesis: null,
    utterance: null
  };

  // ========================================================
  // 2. KHỞI TẠO & PHÁT HIỆN GIỌNG TRÌNH DUYỆT
  // ========================================================

  function initialize() {
    if ('speechSynthesis' in window) {
      state.synthesis = window.speechSynthesis;

      // Load available voices
      loadBrowserVoices();

      // Some browsers load voices async
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadBrowserVoices;
      }
    } else {
      console.warn('Speech Synthesis not supported in this browser');
    }
  }

  function loadBrowserVoices() {
    const voices = state.synthesis.getVoices();
    const viVoices = voices.filter(v => v.lang.startsWith('vi'));

    // Add detected Vietnamese voices to list
    viVoices.forEach((voice, idx) => {
      const exists = VIETNAMESE_VOICES.find(v => v.id === voice.name);
      if (!exists) {
        VIETNAMESE_VOICES.push({
          id: voice.name,
          name: `${voice.name} (Trình duyệt)`,
          gender: voice.name.toLowerCase().includes('female') ? 'female' : 'male',
          region: 'standard',
          provider: 'browser',
          quality: 'medium',
          nativeVoice: voice
        });
      }
    });
  }

  // ========================================================
  // 3. CHUYỂN VĂN BẢN THÀNH GIỌNG NÓI (WEB SPEECH API)
  // ========================================================

  function speak(text, options = {}) {
    if (!text || text.trim() === '') {
      alert('Vui lòng nhập văn bản cần đọc');
      return;
    }

    // Stop current speech if any
    stop();

    const voiceId = options.voice || state.currentVoice;
    const voiceConfig = VIETNAMESE_VOICES.find(v => v.id === voiceId);

    if (!voiceConfig) {
      alert('Không tìm thấy giọng đọc');
      return;
    }

    // Use appropriate TTS provider
    if (voiceConfig.provider === 'browser') {
      speakWithBrowser(text, voiceConfig, options);
    } else if (voiceConfig.provider === 'azure') {
      speakWithAzure(text, voiceConfig, options);
    } else if (voiceConfig.provider === 'google') {
      speakWithGoogle(text, voiceConfig, options);
    }
  }

  function speakWithBrowser(text, voiceConfig, options) {
    if (!state.synthesis) {
      alert('Trình duyệt không hỗ trợ Text-to-Speech');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    // Find the voice
    const voices = state.synthesis.getVoices();
    const voice = voices.find(v => v.name === voiceConfig.id || v.lang.startsWith('vi'));

    if (voice) {
      utterance.voice = voice;
    }

    utterance.lang = 'vi-VN';
    utterance.rate = options.speed || state.speed;
    utterance.pitch = options.pitch || state.pitch;
    utterance.volume = options.volume || state.volume;

    // Event handlers
    utterance.onstart = () => {
      state.isPlaying = true;
      state.isPaused = false;
      state.currentText = text;
      updatePlayButton('pause');
      console.log('🎤 Bắt đầu đọc văn bản...');
    };

    utterance.onend = () => {
      state.isPlaying = false;
      state.isPaused = false;
      updatePlayButton('play');
      console.log('✅ Hoàn thành đọc văn bản');
    };

    utterance.onerror = (event) => {
      console.error('❌ Lỗi TTS:', event);
      state.isPlaying = false;
      updatePlayButton('play');
    };

    state.utterance = utterance;
    state.synthesis.speak(utterance);
  }

  function speakWithAzure(text, voiceConfig, options) {
    // Azure TTS requires API key
    alert('Tính năng Azure TTS đang phát triển. Vui lòng sử dụng giọng trình duyệt.');
    // TODO: Implement Azure TTS with API key
  }

  function speakWithGoogle(text, voiceConfig, options) {
    // Google TTS requires API key
    alert('Tính năng Google TTS đang phát triển. Vui lòng sử dụng giọng trình duyệt.');
    // TODO: Implement Google TTS with API key
  }

  // ========================================================
  // 4. ĐIỀU KHIỂN PHÁT
  // ========================================================

  function pause() {
    if (state.synthesis && state.isPlaying && !state.isPaused) {
      state.synthesis.pause();
      state.isPaused = true;
      updatePlayButton('play');
      console.log('⏸️ Tạm dừng');
    }
  }

  function resume() {
    if (state.synthesis && state.isPaused) {
      state.synthesis.resume();
      state.isPaused = false;
      updatePlayButton('pause');
      console.log('▶️ Tiếp tục');
    }
  }

  function stop() {
    if (state.synthesis) {
      state.synthesis.cancel();
      state.isPlaying = false;
      state.isPaused = false;
      updatePlayButton('play');
      console.log('⏹️ Dừng');
    }
  }

  function togglePlayPause() {
    if (state.isPlaying && !state.isPaused) {
      pause();
    } else if (state.isPaused) {
      resume();
    } else {
      // Start speaking current text
      const textElement = document.getElementById('ttsTextInput');
      if (textElement && textElement.value.trim()) {
        speak(textElement.value);
      } else {
        alert('Vui lòng nhập văn bản cần đọc');
      }
    }
  }

  // ========================================================
  // 5. CÀI ĐẶT
  // ========================================================

  function setVoice(voiceId) {
    state.currentVoice = voiceId;
    localStorage.setItem('tts_voice', voiceId);
  }

  function setSpeed(speed) {
    state.speed = parseFloat(speed);
    localStorage.setItem('tts_speed', speed);
  }

  function setPitch(pitch) {
    state.pitch = parseFloat(pitch);
    localStorage.setItem('tts_pitch', pitch);
  }

  function setVolume(volume) {
    state.volume = parseFloat(volume);
    localStorage.setItem('tts_volume', volume);
  }

  function loadSettings() {
    state.currentVoice = localStorage.getItem('tts_voice') || 'browser-vi-VN';
    state.speed = parseFloat(localStorage.getItem('tts_speed')) || 1.0;
    state.pitch = parseFloat(localStorage.getItem('tts_pitch')) || 1.0;
    state.volume = parseFloat(localStorage.getItem('tts_volume')) || 1.0;
  }

  // ========================================================
  // 6. UI HELPERS
  // ========================================================

  function updatePlayButton(action) {
    const playBtn = document.getElementById('ttsPlayBtn');
    if (playBtn) {
      if (action === 'play') {
        playBtn.innerHTML = '▶️ Phát';
        playBtn.classList.remove('playing');
      } else {
        playBtn.innerHTML = '⏸️ Tạm dừng';
        playBtn.classList.add('playing');
      }
    }
  }

  function renderVoiceSelector() {
    const container = document.getElementById('ttsVoiceSelect');
    if (!container) return;

    let html = '<option value="">-- Chọn giọng đọc --</option>';

    // Group by provider
    const browserVoices = VIETNAMESE_VOICES.filter(v => v.provider === 'browser');
    const azureVoices = VIETNAMESE_VOICES.filter(v => v.provider === 'azure');
    const googleVoices = VIETNAMESE_VOICES.filter(v => v.provider === 'google');

    if (browserVoices.length > 0) {
      html += '<optgroup label="🌐 Giọng Trình duyệt (Miễn phí)">';
      browserVoices.forEach(v => {
        html += `<option value="${v.id}">${v.name}</option>`;
      });
      html += '</optgroup>';
    }

    if (azureVoices.length > 0) {
      html += '<optgroup label="☁️ Microsoft Azure (Cao cấp)">';
      azureVoices.forEach(v => {
        html += `<option value="${v.id}">${v.name}</option>`;
      });
      html += '</optgroup>';
    }

    if (googleVoices.length > 0) {
      html += '<optgroup label="🔊 Google Cloud (Cao cấp)">';
      googleVoices.forEach(v => {
        html += `<option value="${v.id}">${v.name}</option>`;
      });
      html += '</optgroup>';
    }

    container.innerHTML = html;
    container.value = state.currentVoice;
  }

  function renderControlPanel() {
    const container = document.getElementById('ttsControlPanel');
    if (!container) return;

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="display: flex; gap: 8px; align-items: center;">
          <label style="min-width: 100px; font-weight: 600;">Tốc độ:</label>
          <input type="range" id="ttsSpeedRange" min="0.5" max="2" step="0.1" value="${state.speed}"
                 style="flex: 1;" oninput="document.getElementById('ttsSpeedValue').textContent = this.value + 'x'; TTSEngine.setSpeed(this.value);">
          <span id="ttsSpeedValue" style="min-width: 40px; text-align: right; font-weight: 600;">${state.speed}x</span>
        </div>

        <div style="display: flex; gap: 8px; align-items: center;">
          <label style="min-width: 100px; font-weight: 600;">Cao độ:</label>
          <input type="range" id="ttsPitchRange" min="0.5" max="2" step="0.1" value="${state.pitch}"
                 style="flex: 1;" oninput="document.getElementById('ttsPitchValue').textContent = this.value + 'x'; TTSEngine.setPitch(this.value);">
          <span id="ttsPitchValue" style="min-width: 40px; text-align: right; font-weight: 600;">${state.pitch}x</span>
        </div>

        <div style="display: flex; gap: 8px; align-items: center;">
          <label style="min-width: 100px; font-weight: 600;">Âm lượng:</label>
          <input type="range" id="ttsVolumeRange" min="0" max="1" step="0.1" value="${state.volume}"
                 style="flex: 1;" oninput="document.getElementById('ttsVolumeValue').textContent = Math.round(this.value * 100) + '%'; TTSEngine.setVolume(this.value);">
          <span id="ttsVolumeValue" style="min-width: 40px; text-align: right; font-weight: 600;">${Math.round(state.volume * 100)}%</span>
        </div>
      </div>
    `;
  }

  // ========================================================
  // 7. PUBLIC API
  // ========================================================

  return {
    initialize,
    speak,
    pause,
    resume,
    stop,
    togglePlayPause,
    setVoice,
    setSpeed,
    setPitch,
    setVolume,
    loadSettings,
    renderVoiceSelector,
    renderControlPanel,
    getVoices: () => VIETNAMESE_VOICES,
    getState: () => state
  };

})();

// Auto-initialize when page loads
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    TTSEngine.initialize();
    TTSEngine.loadSettings();
  });
}
