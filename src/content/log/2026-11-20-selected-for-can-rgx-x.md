---
title: We're flying with CAN-RGX X
date: 2026-11-20
author: Jeet Joshi
tags:
  - Team
summary: STAMPEDE has been selected for CAN-RGX X. Here's what we're building, how we'll know it worked, and what happens between now and the flight.
draft: false
---

On November 19, 2026 we found out that STAMPEDE has been selected for **CAN-RGX X**, the tenth Canadian Reduced Gravity Experiment Design Challenge, run by SEDS Canada with the Canadian Space Agency and the National Research Council. Our experiment will fly on the NRC's Falcon 20 parabolic aircraft in 2027.

It's been a fast start. The team came together in early October, and we submitted our proposal on October 23. Less than a month later, we're one of the teams going to fly.

## What we're building

A spacecraft has to know its own **inertia tensor**, how its mass is spread out, to point itself accurately. That tensor changes in orbit as fuel burns, panels deploy or payloads move. We want to show it can be measured in flight, in real time, using only the reaction wheels and sensors a spacecraft already carries.

Our test article sits on a low-friction three-axis gimbal inside a Pelican case, so it can rotate freely in any direction but can't float loose. In each microgravity window, the gimbal unlocks and four reaction wheels in a 45° pyramid run a 12 s excitation profile. As the wheels change speed, the article turns in response. From the measured wheel speeds, the IMU gyro, the gimbal encoders and a case accelerometer, a Raspberry Pi 5 on the article estimates nine unknowns: the six values of the inertia tensor and the three components of its centre-of-mass offset. It updates the estimate every 0.1 s with recursive least squares, with an extended Kalman filter running alongside.

## How we'll know it worked

- The principal moments of inertia come within **5 %** of ground truth from a single 12 s window.
- The onboard, real-time estimate agrees with the post-flight batch estimate to within **2 %**.
- The estimator detects an inertia change of **3 % or more** when we move masses between flight blocks.

In simulation so far, 19 of 20 runs came within 2.3 %.

## What's next

- **Late November – December 2026:** kickoff with the CAN-RGX team and our project management presentation.
- **February 2027:** preliminary design review.
- **April 2027:** critical design review.
- **May 23–26, 2027:** IEEE CCECE 2027 in Toronto.
- **June 2027:** ground testing and flight readiness review.
- **July 2027:** flight campaign (tentative).

We'll post here as the design comes together, from the first spin tests to flight day. You can follow along on the [Progress page](/progress) or read more about [the experiment](/experiment).
