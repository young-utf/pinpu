/**
 * Created by youngmoon on 7/15/15.
 */
var Tasks = new Mongo.Collection('tasks');

Meteor.methods({
    insertTask: function (task) {
        console.log(task);
        check(task, {
            content: String
        });

        Tasks.insert(task);
    }
});