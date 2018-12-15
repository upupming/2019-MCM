from scipy.optimize import linprog

c = [-2, -3, 5]
A_ub = [
    [-2, 5, -1],
    [1, 3, 1]
]
b_ub = [-10, 12]
A_eq = [
    [1, 1, 1]
]
b_eq = [7]
x0_bounds = x1_bounds = x2_bounds = (0, None)

res = linprog(c, A_ub, b_ub, A_eq, b_eq, bounds=(x0_bounds, x1_bounds, x2_bounds), options={'disp': True})

print(res)