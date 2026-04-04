export default function translateTotalGroupedProduct(){
	const total = document.querySelector('.woosg_total');
	const total_html = total.innerHTML;
	const new_total = total_html.replace('Total', 'Totale');
	const btn_submit = document.querySelector('.single_add_to_cart_button');
	btn_submit.textContent = "Aggiungi al carello";
	
	total.textContent = '';
	total.innerHTML = new_total;
}