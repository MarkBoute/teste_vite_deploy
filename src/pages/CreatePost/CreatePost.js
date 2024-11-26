import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  const { insertDocument, response, cancelled } = useInsertDocument("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // validar URL da imagem
    try {
      new URL(image);
    } catch (error) {
      setFormError("URL inválida!");
    }

    // criar array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // checar todos os valores
    if (!title || !image || !tags || !body) {
      setFormError("Todos os campos são obrigatórios!");
    }

    if (formError) return;

    insertDocument({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    // redirect para home
    navigate("/");
  };

  return (
    <div className={styles.create_post}>
      <h2>Criar Post</h2>
      <p>Escreva seu post:</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            placeholder="Digite aqui o título"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input
            type="text"
            name="image"
            placeholder="Insira a URL da imagem"
            onChange={(e) => setImage(e.target.value)}
            value={image}
            required
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            placeholder="Digite aqui o conteúdo"
            onChange={(e) => setBody(e.target.value)}
            value={body}
            required
          />
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            placeholder="Digite as tags separadas por vírgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
            required
          />
        </label>
        {!response.loading && <button className="btn">ENVIAR</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
