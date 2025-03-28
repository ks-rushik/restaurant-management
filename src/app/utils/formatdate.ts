const formatDate = (dateString: string) => {
    const date = new Date(dateString);
  
    const formattedDate = new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(date);
  
    let formattedTime = new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  
    formattedTime = formattedTime.replace(/am|pm/i, (match) => match.toUpperCase());
  
    return `${formattedDate}, ${formattedTime}`;
  };
  export default formatDate