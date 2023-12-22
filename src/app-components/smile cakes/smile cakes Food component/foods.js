const foods =[
    {
        id:0,
        name:"Angel Cake",
        amount:30500,
        oldAmount:"₦40000",
        star:5,
        reviews:"(123 reviews)",
        category:"snacks",
        link:"https://www.savoryexperiments.com/wp-content/uploads/2023/06/Angel-Food-Cake-FB.jpg"
    },
    {
        id:1,
        name:"Apple cake",
        amount:48020,
        oldAmount:"₦53000",
        star:5,
        reviews:"(123 reviews)",
        category:"snacks",
        link:"https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/2022-09/French-Style-Apple-Cake_0232-1.jpg?itok=rZe1296X"
    },
    {
        id:2,
        name:"Applesauce Cake",
        amount:22000,
        oldAmount:"₦25000",
        star:3,
        reviews:"(123 reviews)",
        category:"snacks",
        link:"https://www.biggerbolderbaking.com/wp-content/uploads/2023/01/Apple-sauce-cake-Thumbnail-scaled.jpg"
    },
    {
        id:3,
        name:"Beer cake",
        amount:22000,
        oldAmount:"₦25000",
        star:5,
        reviews:"(123 reviews)",
        category:"snacks",
        link:"https://d34zicoa2zcr2f.cloudfront.net/sites/files/bakersbrewstudio2/images/products/202305/tiger_beer_bakersbrew_customised_alcohol_cakes-2223_1x1.jpg"
    },
    {
        id:4,
        name:"Coca-cola",
        amount:1000,
        oldAmount:"₦2500",
        star:5,
        reviews:"(123 reviews)",
        category:"drinks",
        link:"https://c8.alamy.com/comp/F8Y1D9/can-of-coca-cola-on-a-bed-of-ice-over-a-white-background-F8Y1D9.jpg"
    },
    {
        id:5,
        name:"Babka",
        amount:20105,
        oldAmount:"₦25000",
        star:4,
        reviews:"(123 reviews)",
        category:"snacks",
        link:"https://www.twoofakindcooks.com/wp-content/uploads/2015/03/Apricot-and-Almond-Babka.png"
    },
    {
        id:6,
        name:"Banana cake",
        amount:24000,
        oldAmount:"₦29000",
        star:2,
        reviews:"(123 reviews)",
        category:"snacks",
        link:"https://www.africanbites.com/wp-content/uploads/2022/03/IMG_7670-scaled.jpg"
    },
    {
        id:7,
        name:"Batik cake",
        amount:38050,
        oldAmount:"₦45000",
        star:3,
        reviews:"(123 reviews)",
        category:"snacks",
        link:"https://i0.wp.com/mayakitchenette.com/wp-content/uploads/2023/08/Non-Baked-Batik-Cake-with-Chocolate-Ganache-1.jpg?ssl=1"
    },
    {
        id:8,
        name:"Baumkuchen",
        amount:25060,
        oldAmount:"₦32000",
        star:3,
        reviews:"(123 reviews)",
        category:"snacks",
        link:"https://www.thedailymeal.com/img/gallery/baumkuchen-is-the-german-cake-that-takes-three-hours-to-make/intro-1687290361.jpg"
    },
    {
        id:9,
        name:"Bara birth",
        amount:25000,
        oldAmount:"₦35000",
        star:3,
        reviews:"(123 reviews)",
        category:"snacks",
        link:"https://thelittlecheesemonger.co.uk/cdn/shop/products/image_6b678b4c-c09e-419a-8cec-2f92bfec8108_530x.heic?v=1680173682"
    },
    {
        id:10,
        name:"Battenberg cake",
        amount:9550,
        oldAmount:"₦10000",
        star:5,
        reviews:"(123 reviews)",
        category:"snacks",
        link:"https://www.glutenfreealchemist.com/wp-content/uploads/2023/05/gluten-free-battenberg-cake-FI-scaled.jpg"
    },
    {
        id:11,
        name:"Birthday cake",
        amount:50550,
        oldAmount:"₦60000",
        star:5,
        reviews:"(123 reviews)",
        category:"snacks",
        link:"https://handletheheat.com/wp-content/uploads/2015/03/Best-Birthday-Cake-with-milk-chocolate-buttercream-SQUARE.jpg"
    },
    {
        id:12,
        name:"Blackout cake",
        amount:45050,
        oldAmount:"₦50000",
        star:5,
        reviews:"(123 reviews)",
        category:"snacks",
        link:"https://food.fnr.sndimg.com/content/dam/images/food/fullset/2014/12/19/2/FNM_010115-Blackout-Cake-with-Chocolate-Crunch-Recipe_s4x3.jpg.rend.hgtvcom.616.462.suffix/1419359241048.jpeg"
    },
    {
        id:13,
        name:"Blondie",
        amount:9550,
        oldAmount:"₦10000",
        star:5,
        reviews:"(123 reviews)",
        category:"snacks",
        link:"https://funcakes.com/content/uploads/2022/03/Fun-Cakes-20211026-Blondie-002-960x720-c-default.jpg"
    },
    {
        id:14,
        name:"Brownie",
        amount:70550,
        oldAmount:"₦80000",
        star:5,
        reviews:"(123 reviews)",
        category:"snacks",
        link:"https://www.foodandwine.com/thmb/M81kZb0Yde0Eaygbm0XGAplxRls=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Salted-Caramel-Brownies-FW-Cooks-FT-BLOG1219-d8160087ac8443cdb7a9408a5f66e644.jpg"
    },
    {
        id:15,
        name:"Bundt cake",
        amount:45050,
        oldAmount:"₦50050",
        star:5,
        reviews:"(123 reviews)",
        category:"snacks",
        link:"https://handletheheat.com/wp-content/uploads/2018/01/lemon-bundt-cake-recipe-SQUARE.jpg"
    },
    {
        id:16,
        name:"Butter cake",
        amount:20550,
        oldAmount:"₦25000",
        star:5,
        reviews:"(123 reviews)",
        category:"snacks",
        link:"https://www.indianhealthyrecipes.com/wp-content/uploads/2022/12/butter-cake-recipe.jpg"
    },
    {
        id:17,
        name:"Carrot cake",
        amount:50550,
        oldAmount:"₦60000",
        star:5,
        reviews:"(123 reviews)",
        category:"snacks",
        link:"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRm0DjI5YzPJ3F1xnNDAi6EcJLzX-x_gLhupGpw3Wkj5Q1LjjLc"
    },
    {
        id:18,
        name:"Cheese cake",
        amount:70500,
        oldAmount:"₦80100",
        star:5,
        reviews:"(123 reviews)",
        category:"snacks",
        link:"https://drivemehungry.com/wp-content/uploads/2022/07/strawberry-cheesecake-11.jpg"
    },
    {
        id:19,
        name:"Chestnut cake",
        amount:95050,
        oldAmount:"₦100000",
        star:5,
        reviews:"(123 reviews)",
        category:"snacks",
        link:"https://img.delicious.com.au/rPDjJ0WD/del/2018/05/date-and-chestnut-cake-with-pomegranate-butterscotch-80283-2.jpg"
    },
    {
        id:20,
        name:"Chiffon cake",
        amount:35500,
        oldAmount:"₦40000",
        star:5,
        reviews:"(123 reviews)",
        category:"snacks",
        link:"https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/6BF23ED7-9202-4A86-8D63-74DCCE24E6E2/Derivates/0a677378-ba00-4c34-a659-1eb96fc79a5d.jpg"
    },
    
]
//simple react snippet react developer tools
export default foods