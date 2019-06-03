import "./style.css";
import "./styles/main.scss";

const remove = document.getElementById("remove_acc");

// from lecture
if (remove) {
	remove.addEventListener("click", onremove);
}

function onremove(ev) {
	const node = ev.target;
	const id = node.dataset.id;
	fetch(`/user/${id}`, { method: "delete" })
		.then(onresponse)
		.then(onload, onfail);

	function onresponse(res) {
		return res.json();
	}

	function onload() {
		window.location = "/users";
	}

	function onfail() {
		throw new Error("Could not delete!");
	}
}
