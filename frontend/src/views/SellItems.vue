<template>
    <div class="ContentView">
        <div v-if="!selectedProfile">
            <h3>Choose a Profile</h3>
            <div v-for="profile in profiles" :key="profile.id">
                <button @click="selectProfile(profile)">Log in as {{profile.name}}</button>
            </div>
        </div>
        <div v-if="selectedProfile">
            <h3>Logged in as {{selectedProfile.name}}</h3>
            <button @click="goBack">Log Out</button>

            <h3>Add an Item to Sell</h3>
            <div class="form">
                <input type="text" v-model="name" placeholder="Item Name">
                <p></p>
                <input type="text" v-model="price" placeholder="Price">
                <p></p>
                <input type="text" v-model="condition" placeholder="Condition">
                <p></p>
                <input type="text" v-model="description" placeholder="Description">
                <p></p>
                <div class="uploadBox">
                    <input type="file" name="photo" @change="fileChanged" class="upload">
                </div>
                <p></p>
                <button @click="addItem">Submit Item</button>
            </div>

            <div class="divider"></div>

            <h3>{{selectedProfile.name}}'s items:</h3>
            <div class="allItems">
                <div v-for="item in items" :key="item.id">
                    <div class="userItems">
                        <p>{{item.name}} for ${{item.price}}</p>
                        <img :src="item.path" />
                        <button @click="deleteItem(item)">Delete Item</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'SellItems',
        data() {
            return {
                profiles: [],
                items: [],
                selectedProfile: null,
                name: "",
                path: "",
                price: "",
                condition: "",
                description: "",
                file: null,
            }
        },
        created() {
            this.getProfiles();
        },
        methods: {
            async addItem() {
                try {
                    const formData = new FormData();
                    formData.append('photo', this.file, this.file.name)
                    let r1 = await axios.post('/api/photos', formData);
                    await axios.post(`/api/profiles/${this.selectedProfile._id}/items`, {
                        name: this.name,
                        path: r1.data.path,
                        price: this.price,
                        condition: this.condition,
                        description: this.description,
                    });
                    this.getItems();
                    this.name = "";
                    this.path = "";
                    this.price = "";
                    this.condition = "";
                    this.description = "";
                } catch (error) {
                    console.log(error);
                }
            },
            fileChanged(event) {
                this.file = event.target.files[0]
            },
            async getItems() {
                try {
                    const response = await axios.get(`/api/profiles/${this.selectedProfile._id}/items`);
                    this.items = response.data;
                } catch (error) {
                    console.log(error);
                }
            },
            selectProfile(profile) {
                this.selectedProfile = profile;
                this.getItems();
            },
            async getProfiles() {
                try {
                    const response = await axios.get("/api/profiles");
                    this.profiles = response.data;
                } catch (error) {
                    console.log(error);
                }
            },
            async deleteItem(item) {
                try {
                    await axios.delete(`/api/profiles/${this.selectedProfile._id}/items/${item._id}`);
                    this.getItems();
                } catch (error) {
                    console.log(error);
                }
            },
            goBack() {
                this.selectedProfile = null;
            }
        }
    }</script>

<style>
    .userItems {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 7px;
    }
    .userItems p {
        font-size: 1.2em;
        font-weight: bold;
        margin: 3px;
    }
    .divider {
        margin-top: 10px;
        border-top: 1px solid white;
    }


</style>