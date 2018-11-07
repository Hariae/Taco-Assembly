import React, { Component } from 'react';
import axios from 'axios';

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            shells: [],
            baseLayers: [],
            mixins: [],
            condiments: [],
            seasonings: [],
            tacoList: [],
            shell: "",
            base: "",
            mixin: "",
            condiment: "",
            seasoning: "",
            additionalMixinContent:[],
            additionalCondimentContent:[],
            additionalSeasoningContent:[]

        }

        //bind
        this.getShells = this.getShells.bind(this);
        this.getBaseLayers = this.getBaseLayers.bind(this);
        this.getMixins = this.getMixins.bind(this);
        this.getSeasonings = this.getSeasonings.bind(this);

        this.selectionChange = this.selectionChange.bind(this);
        this.createTaco = this.createTaco.bind(this);
    }


    getShells = () => {

        axios.get('https://tacos-ocecwkpxeq.now.sh/shells')
            .then(response => {

                this.setState({
                    shells: response.data
                });

            });

    }

    getBaseLayers = () => {
        axios.get('https://tacos-ocecwkpxeq.now.sh/baseLayers')
            .then(response => {
                console.log(response.data);
                this.setState({
                    baseLayers: response.data
                });
            });
    }

    getMixins = () => {
        axios.get('https://tacos-ocecwkpxeq.now.sh/mixins')
            .then(response => {
                console.log(response.data);
                this.setState({
                    mixins: response.data
                });
            });
    }

    getCondiments = () => {
        axios.get('https://tacos-ocecwkpxeq.now.sh/condiments')
            .then(response => {
                console.log(response.data);
                this.setState({
                    condiments: response.data
                });
            });
    }

    getSeasonings = () => {
        axios.get('https://tacos-ocecwkpxeq.now.sh/seasonings')
            .then(response => {
                console.log(response.data);
                this.setState({
                    seasonings: response.data
                });
            });
    }

    selectionChange = (event) => {

        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        })

    }

    createTaco = ()=>{
        var taco = {
            shell: this.state.shell,
            base: this.state.base,
            mixin: this.state.mixin,
            condiment: this.state.condiment,
            seasoning: this.state.seasoning,
            addMixinCount: 0
        }

        var tacoList = this.state.tacoList;
        tacoList.push(taco);
        //document.getElementsByClassName('custom-select').selectedIndex = 0;
        var selectBoxCollection = document.getElementsByClassName('select-box');
        for(var i=0;i<selectBoxCollection.length;i++){
            selectBoxCollection[i].selectedIndex = 0;
        }
        //console.log(document.getElementsByClassName('select-box'));
        this.setState({
            tacoList:tacoList,            
        });
    }

   
    componentDidMount() {
        this.getShells();
        this.getBaseLayers();
        this.getMixins();
        this.getCondiments();
        this.getSeasonings();
    }


    render() {

        let shellOptions = this.state.shells.map((shell, index) => {
            return (
                <option key={index} value={shell.name}>{shell.name}</option>
            );
        });

        let baseOptions = this.state.baseLayers.map((base, index) => {
            return (
                <option key={index} value={base.name}>{base.name}</option>
            );
        });
        let mixinOptions = this.state.mixins.map((mixin, index) => {
            return (
                <option key={index} value={mixin.name}>{mixin.name}</option>
            );
        });

        let condimentOptions = this.state.condiments.map((condiment, index) => {
            return (
                <option key={index} value={condiment.name}>{condiment.name}</option>
            );
        });

        let seasoningOptions = this.state.seasonings.map((seasoning, index) => {
            return (
                <option key={index} value={seasoning.name}>{seasoning.name}</option>
            );
        });

        let tacoList = this.state.tacoList.map((taco, index)=>{
            return(
                <div className="center-content mt-5" key={index}>
                    <div className="alert alert-success" role="alert">
                        The delicious tacos is of {taco.shell} , 
                        with {taco.base} , {taco.mixin}, {taco.condiment} & {taco.seasoning} seasoning
                    </div>
                </div>
            );
        });

        let mixinAddButton = null;

        if(this.state.mixin !== "")
        {
            mixinAddButton = <div className="mt-3"><button className="btn btn-sm btn-warning"><b>+</b></button> Add another mixin!</div> 
        }

        let condimentAddButton = null;
        if(this.state.condiment !== "")
        {
            condimentAddButton = <div className="mt-3"><button className="btn btn-sm btn-warning"><b>+</b></button> Add more!</div> 
        }
        let seasoningAddButton = null;
        if(this.state.seasoning !== "")
        {
            seasoningAddButton = <div className="mt-3"><button className="btn btn-sm btn-warning"><b>+</b></button> Add more!</div> 
        }

        let additionalMixin = null;

        

        
            
        

        return (
            <div>
                <div className="header container center-content">
                    <h1>Taco Assembly</h1>
                </div>
                <div className="container pad-top-10-pc">
                    <div className="row">

                        <div className="col mt-5">
                            <div>
                                <select className="custom-select custom-select-lg select-box" name="shell" onChange={this.selectionChange}>
                                    <option defaultValue>Select a Shell</option>
                                    {shellOptions}
                                </select>
                            </div>
                            
                        </div>

                        <div className="col mt-5">
                            <div>
                                <select className="custom-select custom-select-lg select-box" name="base" onChange={this.selectionChange}>
                                    <option defaultValue>Select a Base</option>
                                    {baseOptions}
                                </select>
                            </div>
                            
                        </div>

                        <div className="col mt-5">
                            <div>
                                <select className="custom-select custom-select-lg  select-box" name="mixin" onChange={this.selectionChange}>
                                    <option defaultValue>Select a Mixin</option>
                                    {mixinOptions}
                                </select>
                                {additionalMixin}
                                {mixinAddButton}
                            </div>
                            
                        </div>

                        <div className="col mt-5">
                            <div>
                                <select className="custom-select custom-select-lg  select-box" name="condiment" onChange={this.selectionChange}>
                                    <option defaultValue>Select a Condiment</option>
                                    {condimentOptions}
                                </select>
                                {condimentAddButton}
                                </div>
                            
                        </div>

                        <div className="col mt-5">
                            <div>
                                <select className="custom-select custom-select-lg select-box" name="seasoning" onChange={this.selectionChange}>
                                    <option defaultValue>Select a Seasoning</option>
                                    {seasoningOptions}
                                </select>
                                {seasoningAddButton}
                            </div>
                            
                        </div>
                    </div>

                    <div className="center-content pad-top-10-pc">
                        <button className="btn btn-lg btn-success" onClick={this.createTaco}>Create my Taco!</button>
                    </div>
                    <div className="pad-top-5-pc">
                        {tacoList}
                    </div>
                  

                </div>

            </div>
        );
    }
}

export default Main;