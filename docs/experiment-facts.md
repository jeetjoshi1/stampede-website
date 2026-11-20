# STAMPEDE experiment facts (source for the Experiment page)

Answers extracted from the STAMPEDE CAN-RGX proposal, Nov 2026. Section/page references point into the proposal.
UNKNOWN items are still open; update this file and `src/pages/experiment.astro` together when they're confirmed (most at PDR, Feb 2027).

STAMPEDE TECH ANSWERS
A1: NO. The object does not float free. It rotates on a low-friction three-axis gimbal but cannot translate, and a gimbal lock holds it during the 2 g phases. Suggested wording: “rotates freely on a gimbal inside the Pelican case.” Source: Proposal §2.3 p.8; Lay abstract p.1; Table 3 p.9.
A2: YES, with one clarification. The estimator uses the wheel momentum computed from measured wheel speeds, not the commanded torque. Besides the IMU gyro, it also uses the gimbal encoders and a case accelerometer. Source: §2.1 Eq. (1) p.6; H4 p.5.
A3: YES. The six inertia parameters are estimated, along with the three components of the center-of-mass offset from the pivot, so there are nine unknowns. Source: §2.1 p.6; §1.5 p.4.
A4: YES. The flight computer rides on the rotating object and updates the estimate after every 0.1 s window. The estimate is shown live on the laptop. The prototype computer is a Raspberry Pi 5. Source: §2.3 p.8; §2.1 p.6; Table 4 p.14.
A5: YES. RLS is the primary real-time estimate and the EKF runs alongside it. Post-flight batch least squares and constrained least squares are also computed for comparison. Source: §2.1 p.6.
A6: UNKNOWN. The EKF state vector is not given. The proposal only says the EKF “can follow an inertia that changes during a run” and will be added to the simulation for PDR. Source: §2.1 p.6; App. B p.20.
A7: NO. RLS uses an integrated form of the dynamics over 0.1 s windows “so that noisy gyro data need not be differentiated.” No forgetting factor is mentioned. Source: §2.1 p.6; §1.5 p.4.
A8: YES. Wheel profile P has tones between about 0.2 and 0.7 Hz (0.25–0.67 Hz) on each axis, runs for 12 s, and is the same profile in every run except the no-command baseline. Source: §1.5 p.4; Table 2 p.7; §3.3 p.17.
B1: Principal moments within 5 % of ground truth in one 12 s parabola. The onboard estimate should be within 2 % of the post-flight batch estimate. An inertia change of at least 3 % should be detected between blocks. Simulation result: within 2.3 % (19 of 20 runs). Source: §1.6 H1/H2 p.5; §1.3 p.3.
B2: Converges before the end of the 12 s window, within a single parabola, with updates every 0.1 s. Source: §1.6 H1 p.5; Table 2 SO7 p.7; §1.5 p.5.
B3: Two independent references. One is a CAD model updated with every measured component mass. The other is identification on the SPACE Lab spherical air bearing with a gravity model at known center-of-mass offsets. The inertia change between mass positions comes from CAD. Source: §3.1 p.13; Table 2 p.7.
C1: Simulation placeholder object is 2.0 kg. The compliance table gives a maximum mass of 5 kg. The final mass is UNKNOWN (to be updated at PDR). Source: §1.5 p.4; Table 3 p.9; App. B p.20.
C2: Object size is UNKNOWN. The object and gimbal fit within 500 × 500 × 500 mm. Source: Table 3 p.9; Fig. 4 p.11.
C3: Four wheels in a 45° pyramid. Source: §1.5 p.4; §2.3 p.8.
C4: TMotor MN5008-class motors with Flipsky VESC drivers, already in the SPACE Lab. These may change at PDR. Source: Table 4 p.14; §1.5 p.4.
C5: 0.04 N·m (40 mN·m) limit. Simulation peak was under 25 mN·m. Source: App. D p.25; Table 5 p.16; §1.5 p.5.
C6: 4500 RPM. Simulation peak was under 2100 RPM, and the wheels idle at a bias speed of about ±1000 RPM. Source: App. D p.25; Table 2 p.7; Fig. B7 p.24.
C7: UNKNOWN. Only the requirement is given: rotor inertia known to ≤ 1 % (1σ), with spin axes to ≤ 0.5°. Source: Table 2 p.7.
C8: BNO085 for the prototype, possibly replaced by a lower-noise MEMS gyro if the PDR noise budget requires it. Sample rate is 100 Hz. Source: Table 4 p.14; Table 2 p.7.
C9: Raspberry Pi 5 for the prototype. Flight units come from distributors, model UNKNOWN. A base controller (microcontroller board, model UNKNOWN) sits on the case-fixed base. The CAD also shows a Raspberry Pi Pico on the object. Source: Table 4 p.14; Table D1 p.25; Fig. 1 p.10.
C10: Both RLS and EKF update after every 0.1 s window (10 Hz), within ≤ 100 ms. Source: Table 2 p.7; §2.1 p.6.
C11: Wheel-speed telemetry from the drivers (wheel momentum). Absolute rotary encoders, one per gimbal axis (attitude ground truth, and rotating the accelerometer reading into the body frame). A triaxial MEMS case accelerometer (residual cabin acceleration). A lock position sensor (limit switch or Hall-effect, shows lock state on the laptop). Temperatures are logged every run. Source: Table 4 p.14; Table 2 p.7; Table 5 p.16.
C12: All sensor data is logged at 100 Hz with a common time base, plus the commanded-torque log and the final real-time estimate. Data is stored on the object and downloaded after flight, and the live estimate is sent by radio to the laptop. Source: Table 2 p.7; Table 5 p.16; Table 6 p.17.
D1: A case-fixed base is bolted to the Pelican case’s M5 grid and carries the three-axis gimbal, encoders, lock, case accelerometer and base controller. The object is a two-floor plate structure. The bottom floor has the IMU at the center, the gimbal mounting hole, standoffs, a Raspberry Pi Pico, and vertical mass beams with stacked mass discs. The top floor has a battery box on top, the Pi 5 flight computer and a PDB, with four reaction wheels on angled mounts under the arms. Body axes are x, y, z. Source: §2.3 p.8; Figs. 1–3 pp.10–11; Fig. B7 p.24.
D2: The object is tethered: captive on the gimbal at all times. A spring-applied, power-to-release lock holds it during 2 g. It unlocks 4 s after microgravity begins (after a manual start) and relocks 12 s later. Source: §2.4 p.12; §1.5 p.5; Table 6 pp.16–17.
D3: No separate enclosure is described. Everything sits in the Pelican case, which is closed during parabolas, with a gimbal envelope of 500 × 500 × 500 mm. Case size and material: UNKNOWN. Source: Table 3 p.9; Fig. 4 p.11; Application Form eligibility list.
E1: About 15–20 s (“up to 20 s”). The experiment window is 12 s. Source: §1.5 pp.4–5.
E2: 2 g. Source: §3.2 p.15; Table 6 p.16.
E3: 12 per flight, in two blocks of six. Source: §1.5 p.4; §3.3 p.17.
E4: Two flight days. Source: §3.3 p.16; Table A1 p.20.
E5: UNKNOWN as an NRC figure. The simulation assumed 0.05 m/s² rms residual cabin acceleration. Source: §1.5 p.5.
F1: The object is captive on the gimbal, so nothing floats free. All parts are fastened, the case stays closed during parabolas, the gimbal is locked in every phase except microgravity, and damped mechanical stops protect against contact. Source: Table 3 p.9; Table 5 pp.15–16.
F2: Preferred option: slip rings carry power from the aircraft’s 115 V outlet through a 24 V supply. Alternative: a 24 V Ni-Cd pack on the object (about 80 Wh, 3.3 Ah). Lithium is avoided. Protection is a 4 A slow-blow fuse, a latching E-stop and a motor-power relay. Source: §2.3 p.8; §2.4 p.12; App. D pp.25–26.
F3: Three independent inhibits (E-stop, motor-power enable, fail-locked gimbal lock). The structure is designed for 2 g with a 1.5 safety factor, each run has a manual start, and the experiment is safe on power loss. Reviews: PDR + TEDP Rev A (Feb 2027), CDR + TEDP Rev B (Apr 2027), and ground-test video, FRR and final TEDP (Jun 2027). Source: §2.4 p.12; §3.2 p.15; Table C1 p.25.
F4: The experiment must fit in the Pelican case, weigh ≤ 45 kg excluding the case, run from 115 V / 5 A, keep the sum of device currents ≤ 5 A, and stay under 600 W peak. Our design limits are 4 A and 300 W, against a worst case of about 2.5 A and 285 W. Source: Application Form eligibility list; Table 3 p.9; App. D p.26.
G1: Several points worth adding. Two movable masses shift between flight blocks to create a known inertia change. One wheel is run at 50 % and then switched off to test fault detection. The same tests are repeated in 1 g to measure gravity bias: a 0.4 mm center-of-mass offset already causes more than 5 % error on the ground. The estimator and simulation will be released as open source for Canadian student CubeSat teams. Source: §1.3 p.3; §1.4 p.4; Table 7 p.17.

CORRECTIONS (all applied to the site):
- A1: the test article does not float free; it is held on a three-axis gimbal (rotates, cannot translate) and locked during 2 g.
- A7: RLS does not differentiate gyro rates (it integrates the dynamics over 0.1 s windows); no forgetting factor.
- A6: the EKF state isn't given in the proposal, so the site doesn't describe it.
- A2: the estimate uses measured wheel speeds (momentum), not "known torques".
