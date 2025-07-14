export const generateLabel = (user, entry, motif) => {
  const labelContent = `
    <div class="label">
      <strong>Check-in Details:</strong><br>
      User ID: ${entry.visitor._id}<br>
      Nom: ${user.lastname}<br>
      Prénom: ${user.firstname}<br>
      Local: </br>
      `+
      (entry.motif.visit._model === "staff" ? "Responsable: " : "Intitulé: ") + 
      `${motif}<br>
    </div>
  `;

  const printWindow = window.open('', '', 'width=600,height=400');
  printWindow.document.write('<html><head><title>Print Label</title></head><body>');
  printWindow.document.write(labelContent);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
}
console.log('printlabel loaded');