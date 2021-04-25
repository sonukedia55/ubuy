import React from "react";
import { storageHandler } from "../../utils/storage";
import styles from "./dialog.scss";

class DialogState{
    constructor(){
        this.trigger = []
    }
    triggerF(func){
        this.trigger.push(func)
    }
    openDialog(){
        this.trigger[0]()
    }
}

export const dialogstate = new DialogState

class Dialog extends React.Component{

    constructor(props){
        super(props);
        console.log(props,"pDD")
        dialogstate.triggerF(this.openDialog.bind(this))
    }
    openDialog(){
        
        this.dialogContainer.classList.add(styles['open'])
    }
    closeDialog(){
        this.dialogContainer.classList.remove(styles['open'])
    }
    render(){
        return <div className={styles['dialogwrapper']} ref={container => this.dialogContainer = container} >
            <div className={styles['dialogbox']}>
                <div className={styles['closesection']}>
                    <a onClick={this.closeDialog.bind(this)}>X</a>
                </div>
                <LoginDiv {...this.props} closeDialog={this.closeDialog.bind(this)}/>
            </div>
        </div>
    }
}

class LoginDiv extends React.Component{
    constructor(props){
        super(props)
        console.log(props,"pEA")
    }
    setLogin(){
        console.log("didlogin")
        this.props.setUser(this.inDRef.value)
        // this.props.addEntry()
        this.props.closeDialog()
    }

    // comp
    componentDidMount() {
        // console.log("M p: ")
        // let date1 = false
        // console.log("T1: ", this)
        // if(this.props.editVal){
        //     date1 = new Date(this.props.editVal.year, this.props.editVal.month - 1, this.props.editVal.day+1)
        //     date1 = date1.toISOString().split('T')[0]
        //     this.inCRef.value = this.props.editVal.content
        //     this.inDRef.value = date1
        //     console.log(date1)
        // } else {
        //     this.inCRef.value = ''
        //     this.inDRef.value = ''
        //     console.log("T: ", this)
        // }
    }
    
    render(){
        console.log(this.props.editVal ,"edV")
        
        const inputDialog = <div className={styles['dialogcontent']}>
            <input
                ref={inDR => this.inDRef = inDR}
                data-type="form_date"
                placeholder="Enter Username"
              />
              <button
                type="button"
                className={styles["addbutton"]}
                onClick={this.setLogin.bind(this)}
              >Login
              </button>
        </div>


        return inputDialog
    }
}

export default Dialog