<template>
    <div class="ContentView">
        <div v-if="!editingProfile">
            <h3>Create a Profile</h3>
            <button v-if="!creatingProfile" @click="creatingNewProfile">Click Here</button>
            <button v-if="creatingProfile" @click="stopNewProfile">Go Back</button>
            <form v-if="creatingProfile" @submit.prevent="createProfile">
                <input type="text" v-model="name" placeholder="Name">
                <div></div>
                <input type="text" v-model="phone" placeholder="Phone Number">
                <div></div>
                <input type="text" v-model="email" placeholder="Email">
                <div></div>
                <input type="text" v-model="state" placeholder="State">
                <div></div>
                <input type="text" v-model="city" placeholder="City">
                <div></div>
                <button type="submit">Submit</button>
            </form>
        </div>

        <div v-if="!creatingProfile">
            <h3 v-if="!editingProfile" >Edit a Profile</h3>
            <div v-if="editingProfile">
            <h3>Editing {{editname}}'s Profile</h3>
                <button @click="stopEdit">Go Back</button>
                <form @submit.prevent="changeProfile">
                    <input type="text" v-model="editname" placeholder="Name">
                    <div></div>
                    <input type="text" v-model="editphone" placeholder="Phone Number">
                    <div></div>
                    <input type="text" v-model="editemail" placeholder="Email">
                    <div></div>
                    <input type="text" v-model="editstate" placeholder="State">
                    <div></div>
                    <input type="text" v-model="editcity" placeholder="City">
                    <div></div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div v-if="!editingProfile">
                <div v-for="profile in profiles" :key="profile.id">
                    <div class="editOptions">
                        <p>{{profile.name}}</p>
                        <button @click="initiateEdit(profile)">Edit Profile</button>
                        <button @click="deleteProfile(profile)">Delete Profile</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'EditProfile',
    data() {
        return {
            profiles: [],
            name: "",
            phone: "",
            email: "",
            state: "",
            city: "",
            editingProfile: false,
            creatingProfile: false,
            editid: null,
            editname: "",
            editphone: "",
            editemail: "",
            editstate: "",
            editcity: "",
        }
    },
    created() {
        this.getProfiles();
    },
    methods: {
        async createProfile() {
            try {
                await axios.post("/api/profiles", {
                    name: this.name,
                    phone: this.phone,
                    email: this.email,
                    state: this.state,
                    city: this.city,
                });
                await this.getProfiles();
                this.name = "";
                this.phone = "";
                this.email = "";
                this.state = "";
                this.city = "";
                this.creatingProfile = false;
                return true;
            } catch (error) {
                console.log(error);
            }
        },
        async getProfiles() {
            try {
                const response = await axios.get("/api/profiles");
                this.profiles = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async deleteProfile(profile) {
            try {
                await axios.delete("/api/profiles/" + profile._id);
                this.getProfiles();
                return true;
            } catch (error) {
                console.log(error);
            }
        },
        initiateEdit(profile) {
            this.editingProfile = true;
            this.editname = profile.name;
            this.editphone = profile.phone;
            this.editemail = profile.email;
            this.editstate = profile.state;
            this.editcity = profile.city;
            this.editid = profile._id;
        },
        async changeProfile() {
            try {
                await axios.put("/api/profiles/" + this.editid, {
                    name: this.editname,
                    phone: this.editphone,
                    email: this.editemail,
                    state: this.editstate,
                    city: this.editcity,
                });
                this.editingProfile = false;
                await this.getProfiles();
                return true;
            } catch (error) {
                console.log(error);
            }
        },
        creatingNewProfile() {
            this.creatingProfile = true;
        },
        stopNewProfile() {
            this.creatingProfile = false;
        },
        stopEdit() {
            this.editingProfile = false;
        }
    }
}</script>

<style>
    .editOptions {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-top: 1px solid white;
        padding: 10px;
    }
    .editOptions p {
        font-size: 1.2em;
        font-weight: bold;
        margin: 3px;
    }
</style>