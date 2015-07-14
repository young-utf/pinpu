var Tasks = new Mongo.Collection('tasks');

var List = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            tasks: Tasks.find().fetch()
        };
    },
    render() {
        return (
            <ul>
                {this.data.tasks.map(function (task) {
                    return <li key={task._id}>{task.content}</li>;
                })}
            </ul>
        );
    }
});

var NewTaskForm = React.createClass({
    onSubmit (event) {
        event.preventDefault();
        var taskContent = React.findDOMNode(this.refs.content).value;

        Meteor.call('insertTask', {
            content: taskContent
        });
        React.findDOMNode(this.refs.content).value = '';
    },
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input type="text" ref="content" placeholder="add a task..."/>
            </form>
        );
    }
});

var App = React.createClass({
    render() {
        return (
            <div>
                <List />
                <NewTaskForm />
            </div>
        );
    }
});

Meteor.methods({
    insertTask: function (task) {
        console.log(task);
        check(task, {
            content: String
        });

        Tasks.insert(task);
    }
});
  
Meteor.startup(function () {
    React.render(<App />, document.getElementById('root'));
});
