function TagCloud({ tags }) {
  return (
    <div className="tag-cloud">
      {tags.map((tag) => (
        <button key={tag} type="button" className="tag-cloud-pill">
          {tag}
        </button>
      ))}
    </div>
  );
}

export default TagCloud;
