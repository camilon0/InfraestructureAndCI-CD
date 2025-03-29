// Configuración de VPC y subredes
import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export class VpcStack extends cdk.Stack {
  public readonly vpc: ec2.Vpc;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.vpc = new ec2.Vpc(this, "VpcStack", {
      cidr: "10.0.0.0/16",
      maxAzs: 3, // Alta disponibilidad en 3 zonas de disponibilidad
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: "PublicSubnet",
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: "PrivateSubnet",
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS, // No acceso directo desde internet
        },
        {
          cidrMask: 24,
          name: "IsolatedSubnet",
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED, // Aislada sin acceso a internet
        },
      ],
    });

    new cdk.CfnOutput(this, "VpcId", { value: this.vpc.vpcId });
  }
}
