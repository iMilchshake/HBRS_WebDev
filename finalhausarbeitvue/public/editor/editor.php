<?php

echo "php check<br><br>\n\n";

// fetch json
$json = json_decode(file_get_contents("file.json"), true);

// edit json

// save json
$file_content = json_encode($json, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
file_put_contents("file_out.json", $file_content);


foreach($json as $exercise_index => $exercise) {
    echo ">" . $exercise['exercise'] . "<br>";
    foreach($exercise['tasks'] as $task_index => $task) {
        echo ">>" . $task['task'] . "<br>";
        foreach($task['subtasks'] as $subtask_index => $subtask) {
            echo ">>>" . $subtask['q']. "<br>";
        }
    }
    echo "<br>";
}

