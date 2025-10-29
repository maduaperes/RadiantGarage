import React, { useState, useEffect } from 'react';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const [attendanceRating, setAttendanceRating] = useState(0);
  const [serviceRating, setServiceRating] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [charCount, setCharCount] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    const isEmpty = attendanceRating === 0 &&
      serviceRating === 0 &&
      title.trim() === '' &&
      description.trim() === '';
    setSubmitDisabled(isEmpty);
  }, [attendanceRating, serviceRating, title, description]);

  const handleStarClick = (type, value) => {
    const rating = parseInt(value);
    if (type === 'attendance') {
      setAttendanceRating(rating);
    } else {
      setServiceRating(rating);
    }
  };

  const handleClear = () => {
    setAttendanceRating(0);
    setServiceRating(0);
    setTitle('');
    setDescription('');
    setCharCount(0);
    setImage(null);
    setFeedbackMessage('');
  };

  const handleSubmit = () => {
    const review = {
      title: title.trim(),
      description: description.trim(),
      attendanceRating,
      serviceRating,
      image: image?.name || '',
      date: new Date().toISOString(),
    };

    const storedReviews = JSON.parse(localStorage.getItem('lj_reviews') || '[]');
    storedReviews.unshift(review);
    localStorage.setItem('lj_reviews', JSON.stringify(storedReviews));

    setFeedbackMessage('Obrigado pela avaliação!');
    handleClear();
  };

  const renderStars = (type, selectedValue) => {
    return [...Array(5)].map((_, i) => {
      const value = i + 1;
      const isSelected = value <= selectedValue;

      return (
        <span
          key={value}
          data-value={value}
          className={isSelected ? 'selected' : ''}
          onClick={() => handleStarClick(type, value)}
        >
          ★
        </span>
      );
    });
  };

  return (
    <main className="card">
      <div className="back" onClick={() => (window.location.href = 'status.html')}>↩</div>
      <h2>Avalie seu serviço</h2>

      <input
        type="text"
        placeholder="Título da avaliação"
        maxLength="50"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Descreva sua experiência"
        maxLength="200"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          setCharCount(e.target.value.length);
        }}
        rows={4}
      />
      <div id="charCount">{charCount}/200</div>

      <div className="rating-section">
        <label>Atendimento:</label>
        <div className="stars">{renderStars('attendance', attendanceRating)}</div>
      </div>

      <div className="rating-section">
        <label>Serviço:</label>
        <div className="stars">{renderStars('service', serviceRating)}</div>
      </div>

      <div className="upload">
        <label htmlFor="image">Adicionar foto:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      <div className="buttons">
        <button className="primary" disabled={submitDisabled} onClick={handleSubmit}>
          Enviar
        </button>
        <button className="secondary" onClick={handleClear}>
          Limpar
        </button>
      </div>

      {feedbackMessage && <div className="feedback-message">{feedbackMessage}</div>}
    </main>
  );
};

export default FeedbackForm;
