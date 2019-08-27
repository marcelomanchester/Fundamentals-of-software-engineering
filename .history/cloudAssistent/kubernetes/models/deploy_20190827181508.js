module.exports = {
    createDeploymentBody: function (name, image, version, port=80) {
        var json = {
            "kind": "Deployment",
            "apiVersion": "extensions/v1beta1",
            "metadata": {
                "name": name,
                "namespace": "default",
                "creationTimestamp": null
            },
            "spec": {
                "replicas": 1,
                "template": {
                    "metadata": {
                        "labels": {
                            "app": name
                        }
                    },
                    "spec": {
                        "containers": [
                            {
                                "name": name,
                                "image": image + ":" + version,
                                "ports": [
                                    {
                                        "containerPort": port
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        }

        return JSON.stringify(json)
    }

}