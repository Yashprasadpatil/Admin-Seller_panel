// Function to add a product to the product list
function addProduct() {
          const name = document.getElementById("name").value;
          const price = document.getElementById("productprice").value;
          const category = document.getElementById("categories").value;

          const obj = {
              fname: name,
              price: price,
              category: category
          };

          showuseronscreen(obj);
      }

      // Function to delete a product from the product list
      async function deleteProduct(obj, childelem) {
          const parentelem = document.getElementById(obj.category.toLowerCase());
          parentelem.removeChild(childelem);
      }

      // Function to edit a product from the product list
      function editProduct(obj) {
          document.getElementById("name").value = obj.fname;
          document.getElementById("productprice").value = obj.price;
          document.getElementById("categories").value = obj.category;
          document.getElementById("submitbutton").style.display = "none";
          const updatebutton = document.getElementById("updatebutton");
          updatebutton.style.display = "block";
          updatebutton.onclick = async () => {
              obj.fname = document.getElementById("name").value;
              obj.price = document.getElementById("productprice").value;
              obj.category = document.getElementById("categories").value;

              const childelem = document.getElementById(obj._id);
              childelem.textContent = obj.fname + " => " + obj.price;

              document.getElementById("submitbutton").style.display = "block";
              updatebutton.style.display = "none";
          };
      }

      function showuseronscreen(obj) {
          const productList = document.getElementById("productList");
          const li = document.createElement("li");
          li.id = obj._id;
          li.textContent = obj.fname + " => " + obj.price;

          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.onclick = () => deleteProduct(obj, li);

          const editButton = document.createElement("button");
          editButton.textContent = "Edit";
          editButton.onclick = () => editProduct(obj);

          li.appendChild(deleteButton);
          li.appendChild(editButton);

          const categoryList = document.getElementById(obj.category.toLowerCase());
          if (!categoryList) {
              const categoryHeader = document.createElement("h3");
              categoryHeader.textContent = obj.category;
              productList.appendChild(categoryHeader);

              const categoryUl = document.createElement("ul");
              categoryUl.id = obj.category.toLowerCase();
              productList.appendChild(categoryUl);
          }

          const categoryListToAdd = document.getElementById(obj.category.toLowerCase());
          categoryListToAdd.appendChild(li);
}