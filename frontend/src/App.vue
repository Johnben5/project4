<template>
    <div id="app">
        <div class="header">
            <h1>Online Yard Sale</h1>
            <div class="links">
                <router-link to="/">
                    <div class="link">
                        <h2>Browse Items</h2>
                    </div>
                </router-link>
                <router-link to="/SellItems">
                    <div class="link">
                        <h2>Sell Items</h2>
                    </div>
                </router-link>
                <router-link to="/EditProfile">
                    <div class="link">
                        <h2>Profile Info</h2>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="content">
            <router-view />
        </div>
        <div class="footer">
            <a href="https://github.com/Johnben5/project4">Link to Github</a>
        </div>
    </div>
</template>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 18px;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: black;
    background-color: #e6e6e6;
    text-align: center;
}


.header, .footer {
    text-align: center;
    background-color: #595959;
    color: white;
}

.footer {
    padding: 10px;
}

.links {
    display: flex;
    justify-content: center;
}

h1 {
    font-size: 1.5em;
    padding: 10px;
}

h2 {
    font-size: .8em;
}

h3 {
    font-size: 1.4em;
    padding: 10px;
}

.link {
    padding: 10px;
}

a {
    color: white;
    text-decoration: none;
}

img {
    width: 80%;
}

button {
    display: inline-block;
    padding: 0.35em 1.2em;
    margin: 5px;
    border-radius: 0.12em;
    box-sizing: border-box;
    text-decoration: none;
    font-family: 'Roboto',sans-serif;
    font-weight: 300;
    text-align: center;
    transition: all 0.2s;
    background-color: white;
    border: 0.1em solid white;
    color: black;
}

button:hover {
    color: white;
    background-color: #336699;
}

h2:hover, a:hover {
    color: #c6d9ec;
}

input[type=text] {
    width: 80%;
    padding: 12px 20px;
    margin: 6px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 0px;
    box-sizing: border-box;
}

.itemName {
    font-size: 1.3em;
}

.singleItem {
    padding: 15px;
    margin: 5px 0;
}

.Spacer {
    padding: 6px;
}

.upload {
        color: black;
        width: 80%;
}

.uploadBox {
    display: flex;
    flex-direction: column;
    align-items: center;
}
/* Mobile Styles */
@media only screen and (max-width: 700px) {
    .singleItem {
        border-top: 1px solid white;
    }
}

/* Tablet Styles */
@media only screen and (min-width: 701px) and (max-width: 960px) {
    .allItems {
        display: grid;
        grid-template: auto auto auto auto auto / 1fr 1fr;
        grid-column-gap: 0;
        width: 90%;
        margin: auto;
        font-size: .5em;
    }
    input[type=text], .upload {
        width: 60%;
    }
    h1 {
        font-size: 2em;
    }

    h2 {
        font-size: 1em;
    }
}

/* Desktop and Tablet Styles */
@media only screen and (min-width: 961px) {
    .allItems {
            display: grid;
            grid-template: auto auto auto auto auto / 1fr 1fr 1fr;
            grid-column-gap: 0;
            width: 90%;
            margin: auto;
            font-size: .5em;
        }
    input[type=text], .upload {
        width: 50%;
    }
    h1 {
        font-size: 2em;
    }

    h2 {
        font-size: 1em;
    }
}
</style>
