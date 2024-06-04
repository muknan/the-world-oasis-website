function Spinner({ name }) {
  return (
    <div className="grid items-center justify-center">
      <div className="spinner"></div>
      {name && (
        <p class Name="text-xl text-primary-200">
          Loading {name} data...
        </p>
      )}
    </div>
  );
}

export default Spinner;
