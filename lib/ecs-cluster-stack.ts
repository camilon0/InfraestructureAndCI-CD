// Creación del ECS Cluster
import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import { Construct } from "constructs";

interface ECSClusterStackProps extends cdk.StackProps {
  vpc: ec2.Vpc;
}

export class ECSClusterStack extends cdk.Stack {
  public readonly cluster: ecs.Cluster;

  constructor(scope: Construct, id: string, props: ECSClusterStackProps) {
    super(scope, id, props);

    this.cluster = new ecs.Cluster(this, "FargateCluster", {
      vpc: props.vpc,
      containerInsights: true, // Monitoreo con CloudWatch
    });

    new cdk.CfnOutput(this, "ClusterName", { value: this.cluster.clusterName });
  }
}
