<template>
    <div class="ContentView">
        <h3>Find Listings Near You</h3>
        <div v-for="state in itemsByState" :key="state.id">
            <button @click="chooseState(state)">See items in {{state}}</button>
        </div>
        <h3>Items in {{currentState}}</h3>
        <div class="allItems">
            <div v-for="item in totalItems" :key="item.id">

                <div class="singleItem">
                    <p><strong class="itemName">{{item.name}}</strong></p>
                    <img :src="item.path" />
                    <p><strong>Price: </strong>${{item.price}}</p>
                    <p><strong>Condition: </strong>{{item.condition}}</p>
                    <p><strong>Description: </strong>{{item.description}}</p>

                    <div class="Spacer"></div>

                    <div v-for="profile in profiles" :key="profile.id">
                        <div v-if="item.profile == profile._id">
                            <p><strong>Seller: </strong>{{profile.name}}</p>
                            <p><strong>Phone: </strong>{{profile.phone}}</p>
                            <p><strong>Email: </strong>{{profile.email}}</p>
                            <p><strong>City: </strong>{{profile.city}}</p>
                        </div>
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
                itemsByState: [],
                items: [],
                totalItems: [],
                selectedProfile: null,
                currentState: "",
            }
        },
        created() {
            this.getProfiles();
        },
        methods: {
            async getProfiles() {
                try {
                    const response = await axios.get("/api/profiles");
                    this.profiles = response.data;
                    this.findStates();
                } catch (error) {
                    console.log(error);
                }
            },
            findStates() {
                let stateFound = false;
                for (let profile of this.profiles) {
                    for (let uniqueState of this.itemsByState) {
                        if (uniqueState == profile.state) {
                            stateFound = true;
                        }
                    }
                    if (stateFound == false) {
                        this.itemsByState.push(profile.state);

                    }
                    stateFound = false;
                }
            },
            async chooseState(state) {
                this.currentState = state;
                this.totalItems = [];
                for (let profile of this.profiles) {
                    if (profile.state == state) {
                        this.selectedProfile = profile;
                        try {
                            const response = await axios.get(`/api/profiles/${this.selectedProfile._id}/items`);
                            this.items = response.data;
                            this.totalItems = this.totalItems.concat(this.items);
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            }
        },
            
    }</script>

<style>
.userItems p {
    font-size: 1.2em;
    font-weight: bold;
    margin: 3px;
}
</style>