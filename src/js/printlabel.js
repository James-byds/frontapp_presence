export const generateLabel = (user, entry, motif, local) => {
  const labelContent = `
    <div class="label ">
      <strong>Check-in Details:</strong><br>
      <span class="label" User ID:</span> ${entry.visitor._id}<br>
      <span class="label" Nom:</span> ${user.lastname}<br>
      <span class="label" Prénom:</span> ${user.firstname}<br>
      <span class="label" Local:</span> ${local}</br>
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